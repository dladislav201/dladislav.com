import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/shared/types/apiError';
import { z } from 'zod';
import {
  CHAT_MESSAGE_MIN_LENGTH,
  CHAT_MESSAGE_MAX_LENGTH,
} from '@/shared/constants';

const chatSchema = z.object({
  message: z.string().min(CHAT_MESSAGE_MIN_LENGTH).max(CHAT_MESSAGE_MAX_LENGTH),
});

export const validateChatRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const result = chatSchema.safeParse(req.body);

  if (!result.success) {
    const validationError: ApiError = {
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'Invalid request to /api/ai/chat',
    };
    return next(validationError);
  }

  next();
};
