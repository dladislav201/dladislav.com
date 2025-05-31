import { Pinecone } from '@pinecone-database/pinecone';
import { logger } from '@/utils/logger';
import { config } from '@/config';

export class PineconeService {
  private pinecone: Pinecone;
  private indexName = 'portfolio-knowledge';

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: config.pineconeKey,
    });
    this.indexName = config.pineconeIndexName;
  }

  async initialize() {
    try {
      const index = this.pinecone.Index(this.indexName);
      return index;
    } catch (err) {
      logger.error('Error initializing Pinecone: %o', err);
      throw err;
    }
  }

  async upsertVector(id: string, embedding: number[], metadata: any) {
    try {
      const result = await this.initialize();
      await result.upsert([
        {
          id,
          values: embedding,
          metadata,
        },
      ]);
    } catch (err) {
      logger.error('Error upserting vector: %o', err);
      throw err;
    }
  }

  async queryVector(embedding: number[], topK: number = 5) {
    try {
      const index = await this.initialize();
      const results = await index.query({
        vector: embedding,
        topK,
        includeMetadata: true,
      });
      return results.matches;
    } catch (err) {
      logger.error('Error querying vector: %o', err);
      throw err;
    }
  }
}
