import Redis from 'ioredis';
import { ENV } from '../config/env.config';
import logger from '../logger/pino';

let redis: Redis | null = null;

const connectCache = () => {
  if (redis) {
    return redis;
  }

  redis = new Redis(ENV.REDIS_URI, {
    retryStrategy: () => null,
  });

  redis.on('error', (err) => {
    logger.error(err, `ERROR CACAHE CONNECT: `);
    redis = null;
  });

  redis.on('connect', () => {
    logger.debug(`cache conected`);
  });

  redis.on('connecting', () => {
    logger.debug(`cache connecting...`);
  });

  redis.on('ready', () => {
    logger.debug(`cache is now ready...`);
  });

  return redis;
};

const closeCache = () => {
  if (!redis) {
    return;
  }

  redis.disconnect(false);
};

const getFromCache = async <T>(key: string & {}, parse = false) => {
  if (!redis) {
    return null;
  }

  const data = await redis.get(key);

  if (!data) {
    return null;
  }

  if (parse) {
    return JSON.parse(data) as T;
  }

  return data as string;
};

const setToCache = async (
  key: string & {},
  data: string,
  EX?: number
): Promise<null | string> => {
  if (!redis) {
    return null;
  }

  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }

  const options = [];

  if (EX) {
    options.push('EX', EX);
  }

  // @ts-expect-error
  return await redis.set(key, data, ...options);
};

export { connectCache, getFromCache, setToCache, closeCache, redis };
