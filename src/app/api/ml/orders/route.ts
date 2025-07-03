import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  // Buscar o ID do usuário
  const userRes = await fetch('https://api.mercadolibre.com/users/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!userRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch user info' }, { status: userRes.status });
  }
  const user = await userRes.json();
  const userId = user.id;

  // Buscar vendas (orders)
  const ordersRes = await fetch(`https://api.mercadolibre.com/orders/search?seller=${userId}&order.status=paid&sort=date_desc&limit=10`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!ordersRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: ordersRes.status });
  }
  const ordersData = await ordersRes.json();

  return NextResponse.json({ total: ordersData.paging?.total || 0, orders: ordersData.results || [] });
} 