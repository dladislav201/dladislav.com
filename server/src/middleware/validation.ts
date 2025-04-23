import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const chatSchema = Joi.object({
  message: Joi.string()
    .min(1)
    .max(500)
    .required()
});

export const validateChatRequest = (
  req: Request, 
  res: Response, 
  next: NextFunction
): void | Response => {
  const { error } = chatSchema.validate(req.body);
    
  if (error) {
    return res.status(400).json({ 
      error: 'Invalid request', 
      details: error.details[0].message,
      type: 'ValidationError'
    });
  }
    
  next();
};