import { Router } from 'express';
import { validateChatRequest } from '@/middleware/validation';
import { userMessageLimiter } from '@/middleware/userMessageLimiter';
import { AIController } from '@/controllers/ai.controller';
import { OpenAIService } from '@/services/openai.service';
import { PineconeService } from '@/services/pinecone.service';
import { ChatSessionService } from '@/services/chatSession.service';
import { RelevanceService } from '@/services/relevance.service';
import {
  CHAT_BUDGET_JOKES,
  CHAT_MAX_HISTORY_LENGTH,
  IRR_MSG_MAX_WARNINGS,
  CONTEXT_THRESHOLD,
} from '@/shared/constants';

const router = Router();

const openAIService = new OpenAIService();
const pineconeService = new PineconeService();
const chatSessionService = new ChatSessionService(CHAT_MAX_HISTORY_LENGTH);
const relevanceService = new RelevanceService(
  CONTEXT_THRESHOLD,
  IRR_MSG_MAX_WARNINGS,
  CHAT_BUDGET_JOKES,
);

const aiController = new AIController(
  openAIService,
  pineconeService,
  chatSessionService,
  relevanceService,
);

router.post(
  '/chat',
  userMessageLimiter,
  validateChatRequest,
  aiController.createChatCompletion,
);
router.get('/chat/history', aiController.getChatHistory);

export const aiRoutes = router;
