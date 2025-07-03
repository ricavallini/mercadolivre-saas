import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Helper para validar e extrair o access token
export function validateAccessToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.replace('Bearer ', '').trim();
}

// Helper para criar resposta de erro padronizada
export function createErrorResponse(message: string, status: number = 400, details?: any) {
  return NextResponse.json({ 
    error: message, 
    ...(details && { details }) 
  }, { status });
}

// Helper para criar resposta de sucesso padronizada
export function createSuccessResponse(data: any, message?: string) {
  return NextResponse.json({ 
    success: true, 
    data,
    ...(message && { message }) 
  });
}

// Helper para logging estruturado
export const logger = {
  info: (context: string, message: string, data?: any) => {
    console.info(`[${context}] ${message}`, data || '');
  },
  warn: (context: string, message: string, data?: any) => {
    console.warn(`[${context}] ${message}`, data || '');
  },
  error: (context: string, message: string, data?: any) => {
    console.error(`[${context}] ${message}`, data || '');
  }
};

// Helper para validar JSON body
export async function validateJsonBody<T>(request: NextRequest, schema: z.ZodSchema<T>): Promise<T | null> {
  try {
    const body = await request.json();
    const parse = schema.safeParse(body);
    if (!parse.success) {
      return null;
    }
    return parse.data;
  } catch {
    return null;
  }
}

// Helper para validar query params
export function validateQueryParams<T>(request: NextRequest, schema: z.ZodSchema<T>): T | null {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const parse = schema.safeParse(params);
  if (!parse.success) {
    return null;
  }
  return parse.data;
}

// Helper para fazer requisições para a API do Mercado Livre
export async function mlApiRequest(
  endpoint: string, 
  accessToken: string, 
  options: RequestInit = {}
): Promise<{ success: boolean; data?: any; error?: string; status?: number }> {
  try {
    const response = await fetch(`https://api.mercadolibre.com${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'API error',
        status: response.status,
        data
      };
    }

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: 'Network error',
      status: 500
    };
  }
} 