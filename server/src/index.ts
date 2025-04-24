import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import timeout from 'connect-timeout';
import { globalLimiter, aiLimiter } from './config/rate-limiter';
import aiRoutes from './routes/ai.routes';
import { config } from './config/env';

const allowedOrigins = [
  process.env.WEB_URL,
];

if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000');
}

const app: Express = express();

app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    if (process.env.NODE_ENV === 'test' && !origin) {
      return callback(null, true);
    }
    
    if (!origin) return callback(new Error('Origin required for this endpoint'), false);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false);
    }
    
    return callback(null, true);
  },
  methods: ['GET', 'POST']
}));

app.use(globalLimiter);
app.use('/api/ai', aiLimiter);

app.use(timeout('30s'));

app.use(haltOnTimedout);

app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(haltOnTimedout);

app.use('/api/ai', aiRoutes);

app.use(haltOnTimedout);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

function haltOnTimedout(req: Request, res: Response, next: NextFunction) {
  if (!req.timedout) next();
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export { app, server };