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

  // Buscar produtos ativos
  const itemsRes = await fetch(`https://api.mercadolibre.com/users/${userId}/items/search?status=active`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!itemsRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: itemsRes.status });
  }
  const itemsData = await itemsRes.json();

  // Buscar detalhes dos produtos (limitando para os 10 primeiros para evitar excesso de requisições)
  const ids = (itemsData.results || []).slice(0, 10);
  let products: any[] = [];
  if (ids.length > 0) {
    const detailsRes = await fetch(`https://api.mercadolibre.com/items?ids=${ids.join(',')}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (detailsRes.ok) {
      products = await detailsRes.json();
    }
  }

  return NextResponse.json({ total: itemsData.paging?.total || 0, products });
} 