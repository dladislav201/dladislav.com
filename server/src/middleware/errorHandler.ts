import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/shared/types/apiError';
import { logger } from '@/shared/lib/logger';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (typeof err === 'object' && err !== null && 'status' in err) {
    const apiErr = err as ApiError;
    logger.warn('API Error: %o', apiErr);
    res.status(apiErr.status).json({
      status: apiErr.status,
      code: apiErr.code,
      message: apiErr.message,
    });
    return;
  }

  logger.error('Unexpected error caught in errorHandler: %o', err);
  res.status(500).json({
    status: 500,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error. Please try again later.',
  });
}
