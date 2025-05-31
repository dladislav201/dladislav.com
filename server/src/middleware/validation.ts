import { ApiError } from '@/types/apiError';
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const chatSchema = Joi.object({
  message: Joi.string().min(1).max(500).required(),
});

export const validateChatRequest = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { error } = chatSchema.validate(req.body);

  if (error) {
    const validationError: ApiError = {
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'Invalid request to /api/ai/chat',
      details: error.details[0].message,
    };
    return next(validationError);
  }

  next();
};
