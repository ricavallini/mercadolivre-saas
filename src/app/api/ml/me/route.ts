import { NextRequest } from 'next/server';
import { validateAccessToken, createErrorResponse, createSuccessResponse, logger, mlApiRequest } from '@/lib/api-helpers';

export async function GET(request: NextRequest) {
  const accessToken = validateAccessToken(request);
  if (!accessToken) {
    logger.warn('me', 'Access token not provided');
    return createErrorResponse('Access token not provided', 401);
  }

  try {
    const result = await mlApiRequest('/users/me', accessToken);
    
    if (!result.success) {
      logger.error('me', 'Failed to fetch user info', result.status);
      return createErrorResponse('Failed to fetch user info', result.status || 500);
    }

    logger.info('me', 'Dados do usuário retornados');
    return createSuccessResponse(result.data);
  } catch (err) {
    logger.error('me', 'Internal error', err);
    return createErrorResponse('Erro interno do servidor', 500);
  }
} 