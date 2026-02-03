import Redis from 'ioredis';
import { ENV, isDev } from '../config/env.config';

// @ts-expect-error
const redis = new Redis(ENV.REDIS_URI, {
  tls: !isDev,
  lazyConnect: true,
  autoResubscribe: true,
  reconnectOnError: true,
});

const connectCache = () => {
  redis.connect();
  return redis;
};

export { redis, connectCache };
