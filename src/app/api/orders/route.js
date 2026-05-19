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
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  const nextOrderNumber = (count || 0) + 20;
  return NextResponse.json({ orderNumber: nextOrderNumber }, { headers: corsHeaders });
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
    const customer = body.customer;
    const paymentMethod = body.paymentMethod;
    
    for (const item of items) {
      if (typeof item.id !== 'string') {
        return NextResponse.json({ success: false, error: 'ID de producto inválido' }, { status: 400, headers: corsHeaders });
      }
      if (typeof item.qty !== 'number' || item.qty <= 0 || !Number.isInteger(item.qty)) {
        return NextResponse.json({ success: false, error: 'Cantidad inválida' }, { status: 400, headers: corsHeaders });
      }
    }
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 1. Obtener número de orden secuencial
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true });
      
    const newOrderNumber = (count || 0) + 20;

    // 2. Insertar la orden en Supabase para que el contador avance
    // Asumimos que user_id ya es opcional (ver instrucciones al usuario)
    const { error: orderError } = await supabase
      .from('orders')
      .insert({ 
        total_amount: 0, // Aquí podrías calcular el total real
        status: 'pending'
      });

    if (orderError) {
      console.error('Error al crear la orden:', orderError);
      return NextResponse.json({ success: false, error: 'No se pudo registrar la orden' }, { status: 500, headers: corsHeaders });
    }

    // 3. Descontar stock en base de datos y calcular total
    let totalAmount = 0;
    const orderItemsDetails = [];

    for (const item of items) {
      const { data: product, error: fetchError } = await supabase
        .from('products')
        .select('stock, name, price')
        .eq('id', item.id)
        .single();
        
      if (fetchError || !product) {
        console.error('Producto no encontrado o error:', item.id, fetchError);
        continue;
      }
      
      const newStock = Math.max(0, product.stock - item.qty);
      
      const { error: updateError } = await supabase
        .from('products')
        .update({ stock: newStock })
        .eq('id', item.id);

      if (updateError) {
        console.error('Error al actualizar stock:', updateError);
      }

      totalAmount += product.price * item.qty;
      orderItemsDetails.push({
        name: product.name,
        qty: item.qty,
        price: product.price
      });
    }

    const subtotal = totalAmount;
    const discountAmount = subtotal * 0.10;
    const finalTotal = subtotal - discountAmount;

    // 4. Enviar notificación a Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      let message = `🌸 Nuevo Pedido Recibido 🌸\n\n` +
        `🔢 Orden: #${newOrderNumber}\n\n` +
        `📦 Productos:\n\n` +
        orderItemsDetails.map(detail => `${detail.name} (x${detail.qty})`).join('\n') +
        `\n\n💰 Subtotal: Q${subtotal.toFixed(2)}` +
        `\n🎁 Descuento (10% Día de la Madre): -Q${discountAmount.toFixed(2)}` +
        `\n💰 Total: Q${finalTotal.toFixed(2)}\n\n`;

      if (customer) {
        message += `👤 Cliente:\n\n` +
          `Nombre: ${customer.nombre} ${customer.apellido}\n` +
          `Tel: ${customer.tel}\n` +
          `Email: ${customer.email || 'N/D'}\n` +
          `Dirección: ${customer.direccion}\n` +
          `Municipio: ${customer.municipio}\n` +
          `Depto: ${customer.departamento}\n`;
      }

      message += `💳 Método de Pago: ${paymentMethod === 'entrega' ? 'Contra Entrega' : 'Previo Depósito'}`;

      try {
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
      } catch (telegramError) {
        console.error('Error al enviar notificación de Telegram:', telegramError);
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      orderNumber: newOrderNumber
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Error procesando pedido:', error);
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500, headers: corsHeaders });
  }
}
