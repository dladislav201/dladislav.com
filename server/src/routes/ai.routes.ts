import { Router } from 'express';
import { validateChatRequest } from '@/middleware/validation';
import { AIController } from '@/controllers/ai.controller';

const router = Router();
const aiController = new AIController();

router.post('/chat', validateChatRequest, aiController.chat);

export const aiRoutes = router;
