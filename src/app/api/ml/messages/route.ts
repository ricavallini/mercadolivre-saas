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

  // Buscar conversas associadas à venda
  const convRes = await fetch(`https://api.mercadolibre.com/messages/orders/${orderId}/messages`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!convRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: convRes.status });
  }
  const conv = await convRes.json();
  return NextResponse.json(conv);
} 