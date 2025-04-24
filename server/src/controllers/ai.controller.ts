import { Request, Response } from 'express';
import { OpenAIService } from '../services/openai.service';
import { PineconeService } from '../services/pinecone.service';
import xss from 'xss';

export class AIController {
  private aiService: OpenAIService;
  private vectorStore: PineconeService;
  private userRequestCount: Map<string, number>;
  private irrelevantQuestionsCount: Map<string, number>;
  private readonly MAX_REQUESTS_PER_USER = 20;

  constructor() {
    this.aiService = new OpenAIService();
    this.vectorStore = new PineconeService();
    this.irrelevantQuestionsCount = new Map();
    this.userRequestCount = new Map();
  }

  public chat = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      await this.vectorStore.initialize();
            
      const message = xss(req.body.message);
      const userIP = req.ip || 'unknown';
            
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const requestCount = this.userRequestCount.get(userIP) || 0;
            
      if (requestCount >= this.MAX_REQUESTS_PER_USER) {
        return res.status(429).json({ 
          error: 'Request limit exceeded',
          message: `You have reached your limit of ${this.MAX_REQUESTS_PER_USER} questions. Thank you for your interest!`
        });
      }

      this.userRequestCount.set(userIP, requestCount + 1);

      const queryEmbedding = await this.aiService.generateEmbedding(message);
            
      const relevantDocs = await this.vectorStore.queryVector(queryEmbedding, 3);

      const isRelevant = relevantDocs.some(doc => {
        if (doc.score === undefined) return false;
        return typeof doc.score === 'number' && doc.score >= 0.4;
      });

      if (!isRelevant) {
        const count = this.irrelevantQuestionsCount.get(userIP) || 0;
        const budgetJokes = [
          'Hey, I\'m not a free ChatGPT! Vlad is running out of budget to support me, so let\'s talk about him for a bit 😉',
          'Every question not about my developer costs him a bunch of money! 💸 Do you want to ask something about Vlad?',
        ];
                
        if (count >= 3) {
          res.json({ 
            response: budgetJokes[Math.floor(Math.random() * budgetJokes.length)],
            relevance_warning: true
          });
          return;
        }
                
        this.irrelevantQuestionsCount.set(userIP, count + 1);
      } else {
        this.irrelevantQuestionsCount.set(userIP, 0); 
      }
            
      const context = relevantDocs
        .map(doc => doc.metadata?.text)
        .join('\n\n');
            
      const response = await this.aiService.generateResponse(message, context);
        
      res.json({ 
        response,
        context: relevantDocs.map(doc => ({
          text: doc.metadata?.text,
          category: doc.metadata?.category,
          similarity: doc.score
        }))
      });
    } catch (error) {
      console.error('Error in chat controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}