import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { logger } from '@/shared/lib/logger';
import { config } from '@/shared/config';
import { SYSTEM_PROMPT } from '@/shared/constants';

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
    } catch (err) {
      logger.error('Error generating embedding: %o', err);
      throw err;
    }
  }

  async generateResponse(
    context: string,
    chatHistory: ChatCompletionMessageParam[],
  ): Promise<string> {
    try {
      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: SYSTEM_PROMPT + `\n\nCONTEXT INFORMATION: ${context}`,
        },
        ...chatHistory,
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.8,
        max_tokens: 500,
      });

      return (
        response.choices[0].message.content ||
        'Sorry, I could not generate a response.'
      );
    } catch (err) {
      logger.error('Error generating response: %o', err);
      throw err;
    }
  }
}
