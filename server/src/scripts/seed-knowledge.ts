import { OpenAIService } from '../services/openai.service';
import { PineconeService } from '../services/pinecone.service';
import { personalInfoData } from '../data/personal-info';
import { v4 as uuidv4 } from 'uuid';

async function seedKnowledgeBase() {
    const openAIService = new OpenAIService();
    const pineconeService = new PineconeService();

    console.log('Starting to seed knowledge base...');

    try {
        await pineconeService.initialize();
        
        for (const info of personalInfoData) {
            const embedding = await openAIService.generateEmbedding(info.text);
            
            await pineconeService.upsertVector(
                info.id,
                embedding,
                {
                    text: info.text,
                    category: info.category,
                    ...info.metadata
                }
            );
            
            console.log(`Uploaded: ${info.id}`);
        }
        
        console.log('Knowledge base seeded successfully!');
    } catch (error) {
        console.error('Error seeding knowledge base:', error);
    }
}

seedKnowledgeBase().catch(console.error);