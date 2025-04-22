import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const chatSchema = Joi.object({
    message: Joi.string()
        .min(1).message('Message cannot be empty')
        .max(500).message('Message is too long (max 500 characters)')
        .required().message('Message is required')
});

export const validateChatRequest = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = chatSchema.validate(req.body);
    
    if (error) {
        res.status(400).json({ 
            error: 'Invalid request', 
            details: error.details[0].message,
            type: 'ValidationError'
        });
        return;
    }
    
    next();
};