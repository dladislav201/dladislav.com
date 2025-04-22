import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import aiRoutes from './routes/ai.routes';
import { config } from './config/env';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/ai', aiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});