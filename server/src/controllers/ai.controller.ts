import { Request, Response, NextFunction } from 'express';
import { OpenAIService } from '@/services/openai.service';
import { PineconeService } from '@/services/pinecone.service';
import { ChatSessionService } from '@/services/chatSession.service';
import { RelevanceService } from '@/services/relevance.service';
import { MessageDTO } from '@/shared/dto';
import { ChatRequestPayload } from '@/shared/types';
import { logger } from '@/shared/lib';
import xss from 'xss';

export class AIController {
  constructor(
    private aiService: OpenAIService,
    private vectorStore: PineconeService,
    private chatSession: ChatSessionService,
    private relevance: RelevanceService,
  ) {}

  public getChatHistory = (req: Request, res: Response<MessageDTO[]>) => {
    const userKey = req.ip || 'unknown';
    const history = this.chatSession.getHistoryWithMeta(userKey);

    const dto = history.map((h) => ({
      id: h.id,
      role: h.role,
      content: h.content,
      timestamp: h.timestamp,
    }));

    res.json(dto);
  };

  public createChatCompletion = async (
    req: Request,
    res: Response<MessageDTO>,
    next: NextFunction,
  ): Promise<void> => {
    const userKey = req.ip || 'unknown';
    const prompt = xss(req.body.message);

    try {
      await this.vectorStore.initialize();

      const userMsg: ChatRequestPayload = {
        role: 'user' as const,
        content: prompt,
      };
      this.chatSession.addMessage(userKey, userMsg);

      const queryEmbedding = await this.aiService.generateEmbedding(prompt);
      const docs = await this.vectorStore.queryVector(queryEmbedding, 3);

      const joke = this.relevance.getIrrelevantJoke(userKey, docs);
      if (joke) {
        const jokeMsg: MessageDTO = this.chatSession.addMessage(userKey, {
          role: 'assistant' as const,
          content: joke,
        });
        res.json(jokeMsg);
        return;
      }

      const context = docs
        .map((doc) => doc.metadata?.text)
        .filter(Boolean)
        .join('\n\n');

      const reply = await this.aiService.generateResponse(
        context,
        this.chatSession.getHistoryForLLM(userKey),
      );

      const assistantMsg: MessageDTO = this.chatSession.addMessage(userKey, {
        role: 'assistant',
        content: reply,
      });
      res.json(assistantMsg);
    } catch (err) {
      logger.error('Error in AIController.chat: %o', err);
      next(err);
    }
  };
}
