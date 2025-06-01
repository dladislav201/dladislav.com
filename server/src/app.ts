import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import timeout from 'connect-timeout';
import { globalLimiter, aiLimiter } from '@/utils/rateLimiter';
import { errorHandler } from '@/middleware/errorHandler';
import { morganStream } from '@/utils/logger';
import routes from '@/routes';

const allowedOrigins = [process.env.WEB_URL];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('http://localhost:3000');
}

export const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (process.env.NODE_ENV === 'test' && !origin) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(new Error('Origin required for this endpoint'), false);
      }

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error('CORS policy violation'), false);
      }

      return callback(null, true);
    },
    methods: ['GET', 'POST'],
  }),
);
app.use(globalLimiter);
app.use('/api/ai', aiLimiter);

app.use(timeout('30s'));
app.use((req, _res, next) => {
  if (!req.timedout) next();
});

app.use(compression());

app.use(
  morgan('combined', {
    stream: morganStream,
  }),
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use((req, _res, next) => {
  if (!req.timedout) next();
});

app.use('/api', routes);
app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});
