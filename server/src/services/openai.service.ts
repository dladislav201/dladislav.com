import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { config } from '@/config';

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

  async generateResponse(
    context: string,
    chatHistory: ChatCompletionMessageParam[],
  ): Promise<string> {
    try {
      const messages: ChatCompletionMessageParam[] = [
        {
          role: 'system',
          content: `You are an AI assistant for Vladyslav Dobrodii's portfolio website.
        
            ABOUT RESPONSES:
            - Respond in a friendly, professional tone
            - Be concise but informative
            - Be creative and varied in your responses
            - NEVER repeat context information word-for-word
            - Always rephrase and reformulate information in your own words
            - Use different sentence structures and vocabulary even for similar questions
            - Occasionally add relevant examples or analogies to enrich your responses

            CONTEXT GUIDELINES:
            - NEVER deviate from factual information provided in the context
            - Do NOT make up information about Vladyslav that isn't in the context
            - If asked about something not mentioned in the context, clearly state 
              "I don't have specific information about that in my knowledge base about Vladyslav"
            - You may creatively rephrase information, but the factual content must remain accurate
            
            DETERMINING RELEVANT QUESTIONS:
            The following types of questions should ALWAYS be considered relevant:
            1. Questions about Vladyslav (his skills, experience, projects, education, etc.)
            2. Questions about you (the AI) such as "who are you", "how do you work", etc.
            3. General greetings and conversation starters like "hello", "hi", etc.
            
            CONTEXT INFORMATION: ${context}
            
            For questions about Vladyslav, use the context information provided above.
            For questions about yourself or general greetings, you can respond without needing the context.
            
            If a question is completely unrelated to Vladyslav or yourself (like asking about random topics, 
            current events, etc.), politely redirect the conversation back to Vladyslav by saying something like: 
            "I'm an AI assistant specifically designed to talk about Vladyslav's portfolio and experience. I'd be 
            happy to tell you about his skills, projects, or background!"`,
        },
        ...chatHistory,
      ];

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.8,
        max_tokens: 500,
      });

      return response.choices[0].message.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}
