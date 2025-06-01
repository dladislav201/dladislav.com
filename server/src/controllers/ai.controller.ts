import { Request, Response, NextFunction } from 'express';
import { OpenAIService } from '@/services/openai.service';
import { PineconeService } from '@/services/pinecone.service';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { ApiError } from '@/types/apiError';
import { logger } from '@/utils/logger';
import xss from 'xss';

export class AIController {
  private aiService = new OpenAIService();
  private vectorStore = new PineconeService();
  private userRequestCount = new Map<string, number>();
  private irrelevantQuestionsCount = new Map<string, number>();
  private userChatHistory = new Map<string, ChatCompletionMessageParam[]>();
  private readonly MAX_REQUESTS_PER_USER = 20;
  private readonly MAX_HISTORY_LENGTH = 6;
  private readonly RELEVANCE_THRESHOLD = 0.4;
  private readonly MAX_IRRELEVANT_WARNINGS = 3;
  private readonly BUDGET_JOKES = [
    'Hey, I’m not a free ChatGPT! Vlad is running out of budget to support me, so let’s talk about him for a bit 😉',
    'Every question not about my developer costs him a bunch of money! 💸 Do you want to ask something about Vlad?',
  ];

  public chat = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const userIP = req.ip || 'unknown';
    const message = xss(req.body.message);

    try {
      await this.vectorStore.initialize();

      if (this.isRateLimitExceeded(userIP)) {
        const err: ApiError = {
          status: 429,
          code: 'RATE_LIMIT_EXCEEDED',
          message: `You have reached your limit of ${this.MAX_REQUESTS_PER_USER} questions. Thank you for your interest!`,
        };
        next(err);
        return;
      }

      this.incrementRequestCount(userIP);

      const chatHistory = this.getChatHistory(userIP);
      chatHistory.push({ role: 'user', content: message });
      this.trimChatHistoryIfNeeded(userIP);

      const queryEmbedding = await this.aiService.generateEmbedding(message);
      const relevantDocs = await this.vectorStore.queryVector(
        queryEmbedding,
        3,
      );

      const isRelevant = this.checkRelevance(userIP, relevantDocs);
      if (!isRelevant) {
        return this.handleIrrelevantQuestion(userIP, res);
      }

      const context = relevantDocs
        .map((doc) => doc.metadata?.text)
        .filter(Boolean)
        .join('\n\n');

      const response = await this.aiService.generateResponse(
        context,
        chatHistory,
      );

      chatHistory.push({ role: 'assistant', content: response });
      this.userChatHistory.set(userIP, chatHistory);

      res.json({
        response,
        context: relevantDocs.map((doc) => ({
          text: doc.metadata?.text,
          category: doc.metadata?.category,
          similarity: doc.score,
        })),
      });
    } catch (err) {
      logger.error('Error in AIController.chat: %o', err);
      next(err);
    }
  };

  private isRateLimitExceeded(userIP: string): boolean {
    const count = this.userRequestCount.get(userIP) ?? 0;
    return count >= this.MAX_REQUESTS_PER_USER;
  }

  private incrementRequestCount(userIP: string): void {
    const count = this.userRequestCount.get(userIP) ?? 0;
    this.userRequestCount.set(userIP, count + 1);
  }

  private getChatHistory(userIP: string): ChatCompletionMessageParam[] {
    if (!this.userChatHistory.has(userIP)) {
      this.userChatHistory.set(userIP, []);
    }
    return this.userChatHistory.get(userIP)!;
  }

  private trimChatHistoryIfNeeded(userIP: string): void {
    const history = this.userChatHistory.get(userIP)!;
    const excess = history.length - this.MAX_HISTORY_LENGTH * 2;
    if (excess > 0) {
      history.splice(0, excess);
    }
  }

  private checkRelevance(userIP: string, docs: { score?: number }[]): boolean {
    const hasRelevant = docs.some(
      (doc) =>
        typeof doc.score === 'number' && doc.score >= this.RELEVANCE_THRESHOLD,
    );
    if (!hasRelevant) {
      const count = this.irrelevantQuestionsCount.get(userIP) ?? 0;
      this.irrelevantQuestionsCount.set(userIP, count + 1);
    } else {
      this.irrelevantQuestionsCount.set(userIP, 0);
    }
    return hasRelevant;
  }

  private handleIrrelevantQuestion(userIP: string, res: Response): void {
    const count = this.irrelevantQuestionsCount.get(userIP) ?? 0;

    if (count >= this.MAX_IRRELEVANT_WARNINGS) {
      const joke =
        this.BUDGET_JOKES[Math.floor(Math.random() * this.BUDGET_JOKES.length)];
      res.json({ response: joke, relevance_warning: true });
    }
  }
}
