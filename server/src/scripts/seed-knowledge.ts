import { PineconeService, OpenAIService } from '@/services';
import { personalInfoData } from '@/data/personal-info';

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
  } catch (error) {
    console.error('Error seeding knowledge base:', error);
  }
}

seedKnowledgeBase().catch(console.error);
