import { config } from '@/shared/config';
import { app } from './app';
import { logger } from './shared/lib/logger';

const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info('Server started on port %d', PORT);
});

export { server };
