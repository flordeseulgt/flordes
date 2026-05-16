import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const stateFilePath = path.join(process.cwd(), 'src/data/global_state.json');

// --- 1. RATE LIMITING BÁSICO EN MEMORIA ---
// Protege contra bombardeos (DoS). En producción se aconseja Redis o @upstash/ratelimit.
const rateLimitCache = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  if (!rateLimitCache.has(ip)) {
    rateLimitCache.set(ip, { count: 1, firstRequest: now });
    return true;
  }
  const data = rateLimitCache.get(ip);
  if (now - data.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitCache.set(ip, { count: 1, firstRequest: now });
    return true;
  }
  if (data.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  data.count++;
  return true;
}

// --- 2. CORS HEADERS (WHITELIST) ---
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*', // Restringir a dominio en Prod
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  try {
    const data = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    return NextResponse.json({ orderNumber: data.lastOrderNumber + 1 }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ orderNumber: 20 }, { headers: corsHeaders });
  }
}

export async function POST(request) {
  // --- APLICAR RATE LIMITING ---
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Too Many Requests. Intenta más tarde.' }, { status: 429, headers: corsHeaders });
  }

  try {
    const body = await request.json(); 
    
    // --- 3. FILTRO Y VALIDACIÓN ESTRICTA DE INPUTS ---
    // Evita inyección y payloads malformados
    if (!body || typeof body !== 'object' || !Array.isArray(body.items)) {
      return NextResponse.json({ success: false, error: 'Formato de datos inválido' }, { status: 400, headers: corsHeaders });
    }

    const items = body.items;
    
    // Validar tipos de datos para prevenir Inyección (SQL, Prompt o RegExp)
    for (const item of items) {
      if (typeof item.id !== 'number' && typeof item.id !== 'string') {
        return NextResponse.json({ success: false, error: 'ID de producto inválido' }, { status: 400, headers: corsHeaders });
      }
      if (typeof item.qty !== 'number' || item.qty <= 0 || !Number.isInteger(item.qty)) {
        return NextResponse.json({ success: false, error: 'Cantidad inválida' }, { status: 400, headers: corsHeaders });
      }
    }
    
    // --- 4. PROTECCIÓN DE LÓGICA DE NEGOCIO ---
    let data = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    data.lastOrderNumber += 1;
    const newOrderNumber = data.lastOrderNumber;
    
    const productsFilePath = path.join(process.cwd(), 'src/data/products.js');
    let productsContent = fs.readFileSync(productsFilePath, 'utf8');
    
    items.forEach(item => {
      // Limpiar ID por si acaso (Sanitización adicional contra inyección regex)
      const safeId = String(item.id).replace(/[^a-zA-Z0-9-]/g, '');
      const regex = new RegExp(`id:\\s*${safeId},\\s*stock:\\s*(\\d+)`, 'g');
      
      productsContent = productsContent.replace(regex, (match, stockStr) => {
        const newStock = Math.max(0, parseInt(stockStr) - item.qty);
        return `id: ${safeId}, stock: ${newStock}`;
      });
    });
    
    // --- 5. USO DE COLAS (SIMULADO) PARA PROCESOS LARGOS ---
    // Si enviar correos tomara mucho, lo enviaríamos a un Queue o Edge Function aquí sin bloquear.
    
    fs.writeFileSync(productsFilePath, productsContent);
    fs.writeFileSync(stateFilePath, JSON.stringify(data, null, 2));
    
    // --- 6. VALIDACIÓN DE OUTPUTS ---
    // Solo retornamos data confirmada, nada sensible.
    return NextResponse.json({ 
      success: true, 
      orderNumber: newOrderNumber
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error procesando pedido:', error);
    // Nunca retornar el log de error real al frontend para evitar fugas de información
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500, headers: corsHeaders });
  }
}
