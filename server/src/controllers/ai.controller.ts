import { Request, Response } from 'express';
import { OpenAIService } from '../services/openai.service';
import { PineconeService } from '../services/pinecone.service';

export class AIController {
    private aiService: OpenAIService;
    private vectorStore: PineconeService;
    private irrelevantQuestionsCount: Map<string, number>;

    constructor() {
        this.aiService = new OpenAIService();
        this.vectorStore = new PineconeService();
        this.irrelevantQuestionsCount = new Map();
    }

    async chat(req: Request, res: Response): Promise<void> {
        try {
            await this.vectorStore.initialize();
            
            const { message } = req.body;
            const userIP = req.ip || 'unknown';
            
            if (!message) {
                res.status(400).json({ error: 'Message is required' });
                return;
            }

            const queryEmbedding = await this.aiService.generateEmbedding(message);
            
            const relevantDocs = await this.vectorStore.queryVector(queryEmbedding, 3);

            const isRelevant = relevantDocs.some(doc => {
                if (doc.score === undefined) return false;
                return typeof doc.score === 'number' && doc.score >= 0.7;
            });

            if (!isRelevant) {
                const count = this.irrelevantQuestionsCount.get(userIP) || 0;
                const budgetJokes = [
                    "Hey, I'm not a free ChatGPT! Vlad is running out of budget to support me, so let's talk about him for a bit 😉",
                    "Every question not about my developer costs him a bunch of money! 💸 Do you want to ask something about Vlad?",
                ];
                
                if (count >= 1) {
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
    }
}