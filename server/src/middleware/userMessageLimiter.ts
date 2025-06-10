import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/shared/types/apiError';
import { CHAT_MAX_MESSAGES } from '@/shared/constants';
import { logger } from '@/shared/lib';

const userMessageCounts = new Map<string, number>();

export const userMessageLimiter = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const key = req.ip || 'unknown';
  const count = userMessageCounts.get(key) ?? 0;

  if (count >= CHAT_MAX_MESSAGES) {
    logger.warn(`Rate limit exceeded for ${key}`);
    const err: ApiError = {
      status: 429,
      code: 'USER_MESSAGE_LIMIT_EXCEEDED',
      message: `Limit of ${CHAT_MAX_MESSAGES} requests reached.`,
    };
    next(err);
    return;
  }

  userMessageCounts.set(key, count + 1);
  next();
};
