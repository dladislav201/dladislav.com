import request from 'supertest';
import { app } from '@/app';

describe('AI API Integration', () => {
  test('respond to questions about portfolio', async () => {
    const response = await request(app)
      .post('/api/ai/chat')
      .send({ message: 'What technologies does your developer know?' });

    expect(response.status).toBe(200);
    expect(response.body.content).toContain('JavaScript');
  }, 30000);
});
