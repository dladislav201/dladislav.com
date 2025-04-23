import request from 'supertest';
import express from 'express';
import aiRoutes from '../../routes/ai.routes';

const app = express();
app.use(express.json());
app.use('/api/ai', aiRoutes);

describe('AI API Endpoints', () => {
  test('POST /api/ai/chat returns 400 without message', async () => {
    const response = await request(app)
      .post('/api/ai/chat')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid request');
  });
});