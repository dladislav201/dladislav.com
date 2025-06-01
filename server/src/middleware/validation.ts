import { ApiError } from '@/types/apiError';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1).max(500),
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
      details: result.error.errors[0].message,
    };
    return next(validationError);
  }

  next();
};
