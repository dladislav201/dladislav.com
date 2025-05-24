import { config } from '@/config';
import { app } from './app';

const server = app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export { server };
