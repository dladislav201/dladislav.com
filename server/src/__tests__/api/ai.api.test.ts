import request from 'supertest';
import express from 'express';
import routes from '@/routes';
import { errorHandler } from '@/middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

describe('AI API Endpoints', () => {
  test('POST /api/ai/chat returns 400 without message', async () => {
    const response = await request(app).post('/api/ai/chat').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid request to /api/ai/chat');
  });
});
