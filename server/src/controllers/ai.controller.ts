import { Request, Response } from 'express';
import { OpenAIService } from '../services/openai.service';
import { PineconeService } from '../services/pinecone.service';

export class AIController {
    private aiService: OpenAIService;
    private vectorStore: PineconeService;

    constructor() {
        this.aiService = new OpenAIService();
        this.vectorStore = new PineconeService();
    }

    async chat(req: Request, res: Response): Promise<void> {
        try {
            await this.vectorStore.initialize();
            
            const { message } = req.body;
            
            if (!message) {
                res.status(400).json({ error: 'Message is required' });
                return;
            }

            // Генеруємо embedding для питання користувача
            const queryEmbedding = await this.aiService.generateEmbedding(message);
            
            // Знаходимо релевантну інформацію
            const relevantDocs = await this.vectorStore.queryVector(queryEmbedding, 3);
            
            // Формуємо контекст з релевантної інформації
            const context = relevantDocs
                .map(doc => doc.metadata?.text)
                .join('\n\n');
            
            // Генеруємо відповідь
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
    }
}