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

  const orderRes = await fetch(`https://api.mercadolibre.com/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!orderRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch order details' }, { status: orderRes.status });
  }
  const order = await orderRes.json();
  return NextResponse.json(order);
} 