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
                model: 'text-embedding-3-small',
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
                model: 'gpt-4o-mini',
                messages: [
                {
                    role: 'system',
                    content: `You are an AI assistant helping to provide information about Vladyslav Dobrodii's professional portfolio. 
                        Respond in the third person, providing accurate information based on the following context: ${context}. 
                        Always clarify that you're an AI assistant representing Vladyslav's professional profile.`,
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