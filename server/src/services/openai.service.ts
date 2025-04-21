import OpenAI from 'openai';
import { config } from '../config/env';

export class OpenAIService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: config.openAIKey,
        });
    }

    async generateEmbedding(text: string): Promise<number[]> {
        try {
            const response = await this.openai.embeddings.create({
                model: 'text-embedding-ada-002',
                input: text,
            });
            return response.data[0].embedding;
        } catch (error) {
            console.error('Error generating embedding:', error);
            throw error;
        }
    }

    async generateResponse(prompt: string, context: string): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                {
                    role: 'system',
                    content: `You are an AI assistant on a portfolio website. Use the following context to answer questions: ${context}`,
                },
                {
                    role: 'user',
                    content: prompt,
                },
                ],
                temperature: 0.7,
                max_tokens: 500,
            });
            
            return response.choices[0].message.content || 'Sorry, I could not generate a response.';
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }
}