import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const stateFilePath = path.join(process.cwd(), 'src/data/global_state.json');

export async function GET() {
  try {
    const data = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    return NextResponse.json({ orderNumber: data.lastOrderNumber + 1 });
  } catch (error) {
    return NextResponse.json({ orderNumber: 20 });
  }
}

export async function POST(request) {
  try {
    const { items } = await request.json(); // items: [{ id, qty }]
    
    // Leer estado actual
    let data = JSON.parse(fs.readFileSync(stateFilePath, 'utf8'));
    
    // Incrementar número de orden
    data.lastOrderNumber += 1;
    const newOrderNumber = data.lastOrderNumber;
    
    // Descontar stock (si el producto ya existe en el estado global)
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        if (!data.productStock) data.productStock = {};
        if (!data.productStock[item.id]) {
          // Inicializar si no existe (esto se puede mejorar cargando los datos de products.js)
          data.productStock[item.id] = 100; // Stock inicial por defecto si no se conoce
        }
        data.productStock[item.id] -= item.qty;
      });
    }
    
    // Guardar cambios
    fs.writeFileSync(stateFilePath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      orderNumber: newOrderNumber,
      remainingStock: data.productStock
    });
  } catch (error) {
    console.error('Error al procesar pedido:', error);
    return NextResponse.json({ success: false, error: 'Error al procesar el pedido' }, { status: 500 });
  }
}
