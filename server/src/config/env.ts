import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3001,
    openAIKey: process.env.OPENAI_API_KEY!,
    pineconeKey: process.env.PINECONE_API_KEY!,
    environment: process.env.NODE_ENV || 'development',
};