import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[orders] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  try {
    // Buscar o ID do usuário
    const userRes = await fetch('https://api.mercadolibre.com/users/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userRes.ok) {
      console.error('[orders] Failed to fetch user info', userRes.status);
      return NextResponse.json({ error: 'Failed to fetch user info' }, { status: userRes.status });
    }
    const user = await userRes.json();
    const userId = user.id;

    // Buscar vendas (orders) pagas
    const ordersRes = await fetch(`https://api.mercadolibre.com/orders/search?seller=${userId}&order.status=paid&sort=date_desc&limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!ordersRes.ok) {
      console.error('[orders] Failed to fetch orders', ordersRes.status);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: ordersRes.status });
    }
    const ordersData = await ordersRes.json();

    console.info('[orders] Vendas retornadas');
    return NextResponse.json({ total: ordersData.paging?.total || 0, orders: ordersData.results || [] });
  } catch (err) {
    console.error('[orders] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 