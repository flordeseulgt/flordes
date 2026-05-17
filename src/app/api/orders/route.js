import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// --- 1. RATE LIMITING BÁSICO EN MEMORIA ---
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
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request) {
  return NextResponse.json({ orderNumber: Math.floor(Math.random() * 10000) }, { headers: corsHeaders });
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ success: false, error: 'Too Many Requests' }, { status: 429, headers: corsHeaders });
  }

  try {
    const body = await request.json(); 
    
    if (!body || typeof body !== 'object' || !Array.isArray(body.items)) {
      return NextResponse.json({ success: false, error: 'Formato de datos inválido' }, { status: 400, headers: corsHeaders });
    }

    const items = body.items;
    
    for (const item of items) {
      if (typeof item.id !== 'string') { // ID ahora es UUID (string)
        return NextResponse.json({ success: false, error: 'ID de producto inválido' }, { status: 400, headers: corsHeaders });
      }
      if (typeof item.qty !== 'number' || item.qty <= 0 || !Number.isInteger(item.qty)) {
        return NextResponse.json({ success: false, error: 'Cantidad inválida' }, { status: 400, headers: corsHeaders });
      }
    }
    
    // Conectar a Supabase usando Service Role para poder modificar stock (salta RLS)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Descontar stock en base de datos
    for (const item of items) {
      // 1. Obtener el stock actual
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock')
        .eq('id', item.id)
        .single();
        
      if (fetchError || !product) {
        console.error('Producto no encontrado:', item.id);
        continue;
      }
      
      const newStock = Math.max(0, product.stock - item.qty);
      
      // 2. Actualizar stock
      await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', item.id);
    }
    
    const newOrderNumber = Math.floor(Math.random() * 100000);
    
    return NextResponse.json({ 
      success: true, 
      orderNumber: newOrderNumber
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error procesando pedido:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500, headers: corsHeaders });
  }
}
