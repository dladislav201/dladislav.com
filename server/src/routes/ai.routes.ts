import { Router, RequestHandler } from 'express';
import { validateChatRequest } from '../middleware/validation';
import { AIController } from '../controllers/ai.controller';

const router = Router();
const aiController = new AIController();

router.post('/chat', 
  validateChatRequest as RequestHandler, 
  aiController.chat as RequestHandler
);

export default router;