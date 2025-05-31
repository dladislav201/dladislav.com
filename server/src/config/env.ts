import { getEnvVar } from '@/utils/getEnvVar';
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 3001),
  environment: process.env.NODE_ENV ?? 'development',
  openAIKey: getEnvVar('OPENAI_API_KEY'),
  pineconeKey: getEnvVar('PINECONE_API_KEY'),
  pineconeIndexName: getEnvVar('PINECONE_INDEX_NAME'),
};
