import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  try {
    const mlRes = await fetch('https://api.mercadolibre.com/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!mlRes.ok) {
      const err = await mlRes.json();
      return NextResponse.json({ error: err.message || 'Mercado Livre API error' }, { status: mlRes.status });
    }
    const data = await mlRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 