import { OpenAIService } from '../src/services/openai.service';
import { PineconeService } from '../src/services/pinecone.service';
import { personalInfoData } from './data/personalInfo';
import { logger } from '../src/shared/lib/logger';

async function seedKnowledgeBase() {
  const openAIService = new OpenAIService();
  const pineconeService = new PineconeService();

  try {
    await pineconeService.initialize();

    for (const info of personalInfoData) {
      const embedding = await openAIService.generateEmbedding(info.text);

      await pineconeService.upsertVector(info.id, embedding, {
        text: info.text,
        category: info.category,
        ...info.metadata,
      });
    }
  } catch (err) {
    logger.error('Error seeding knowledge base: %o', err);
  }
}

seedKnowledgeBase()
  .then(() => logger.info('Seeding finished successfully'))
  .catch((err) =>
    logger.error('Unhandled error seeding knowledge base: %o', err),
  );
