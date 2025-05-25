import { Router, RequestHandler } from 'express';
import { validateChatRequest } from '@/middleware';
import { AIController } from '@/controllers';

const router = Router();
const aiController = new AIController();

router.post('/chat', validateChatRequest as RequestHandler, aiController.chat as RequestHandler);

export const aiRoutes = router;
