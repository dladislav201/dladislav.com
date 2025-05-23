import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  openAIKey: process.env.OPENAI_API_KEY!,
  pineconeKey: process.env.PINECONE_API_KEY!,
  pineconeIndexName: process.env.PINECONE_INDEX_NAME!,
  environment: process.env.NODE_ENV || 'development',
};

if (!process.env.OPENAI_API_KEY || !process.env.PINECONE_API_KEY) {
  throw new Error('Missing required environment variables');
}