import { createLogger, format, transports } from 'winston';
import { config } from '@/config';

const { combine, timestamp, printf, colorize, splat } = format;

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] ${level}: ${message}${metaString}`;
});

export const logger = createLogger({
  level: config.environment === 'production' ? 'info' : 'debug',

  format: combine(timestamp(), splat()),

  transports: [
    new transports.Console({
      format:
        process.env.NODE_ENV === 'production'
          ? combine(format.json())
          : combine(colorize(), devFormat),
    }),
  ],
});

export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};
