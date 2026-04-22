import jwt from 'jsonwebtoken';
import type { IncomingMessage } from 'http';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET environment variable is required in production');
}

const EFFECTIVE_JWT_SECRET = JWT_SECRET ?? 'hotel_erp_secret_key_change_in_production';

export interface AuthUser {
  id: number;
  email: string;
}

/**
 * Extrai e verifica o Bearer token do header de autorização.
 * Se SKIP_AUTH=true, retorna null sem verificar.
 * @throws Error se o token estiver ausente ou inválido (quando SKIP_AUTH não está ativo)
 */
export function extractUser(req: IncomingMessage): AuthUser | null {
  if (process.env.SKIP_AUTH === 'true') {
    return null;
  }

  const authHeader = (req.headers as Record<string, string | undefined>).authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Missing bearer token');
  }

  const token = authHeader.slice(7);

  try {
    return jwt.verify(token, EFFECTIVE_JWT_SECRET) as AuthUser;
  } catch {
    throw new Error('Invalid or expired token');
  }
}

