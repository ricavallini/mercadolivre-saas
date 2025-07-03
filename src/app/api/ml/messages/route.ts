import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  orderId: z.string().min(1, 'orderId é obrigatório'),
});

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('[messages] Access token not provided');
    return NextResponse.json({ error: 'Access token not provided' }, { status: 401 });
  }
  const accessToken = authHeader.replace('Bearer ', '').trim();

  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const parse = querySchema.safeParse({ orderId });
  if (!parse.success) {
    console.warn('[messages] Validation error', parse.error.flatten());
    return NextResponse.json({ error: 'Validation error', details: parse.error.flatten() }, { status: 400 });
  }

  try {
    // Buscar mensagens da venda
    const msgRes = await fetch(`https://api.mercadolibre.com/messages/orders/${orderId}/sellers`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!msgRes.ok) {
      console.error('[messages] Failed to fetch messages', msgRes.status);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: msgRes.status });
    }
    const messages = await msgRes.json();
    console.info('[messages] Mensagens retornadas', { orderId });
    return NextResponse.json(messages);
  } catch (err) {
    console.error('[messages] Internal error', err);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
} 