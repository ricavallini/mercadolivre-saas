import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  if (!orderId) {
    return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
  }

  // Buscar detalhes da venda para obter buyer id
  const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!orderRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
  }
  const order = await orderRes.json();
  const buyerId = order.buyer?.id;
  if (!buyerId) {
    return NextResponse.json({ error: 'Buyer ID not found for this order' }, { status: 404 });
  }

  // Buscar dados do comprador
  const buyerRes = await fetch(`https://api.mercadolibre.com/users/${buyerId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!buyerRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch buyer info' }, { status: buyerRes.status });
  }
  const buyer = await buyerRes.json();

  return NextResponse.json(buyer);
} 