import { Pinecone } from '@pinecone-database/pinecone';
import { config } from '../config/env';

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
        } catch (error) {
            console.error('Error initializing Pinecone:', error);
            throw error;
        }
    }

    async upsertVector(id: string, embedding: number[], metadata: any) {
        try {
            const index = await this.initialize();
            await index.upsert([
                {
                id,
                values: embedding,
                metadata,
                },
            ]);
        } catch (error) {
            console.error('Error upserting vector:', error);
            throw error;
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
        } catch (error) {
            console.error('Error querying vector:', error);
            throw error;
        }
    }
}