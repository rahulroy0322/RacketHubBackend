import type Redis from 'ioredis';
import type { RedisLogType } from '../@types/logger';
import { LOG_KEY } from '../const/logger.const';
import { CACHE_KEYS } from './keys';
import { redis } from './main';
import { getPrevLogs } from './prevData';

const cacheLog = async ({
  redis,
  key = LOG_KEY,
  data,
}: {
  key?: string;
  data: RedisLogType;
  redis: Redis;
}) => {
  if (redis.status !== 'ready') {
    console.error('redis is not connected yet!');
    getPrevLogs().push({
      key,
      data,
    });
    return;
  }

  try {
    await redis.lpush(CACHE_KEYS.log(key), JSON.stringify(data));
  } catch (err) {
    console.error(err, 'Error Logging');
  }
};

const getLogsCache = async () => {
  if (redis.status !== 'ready') {
    return null;
  }

  const logs = await redis.lrange(CACHE_KEYS.log(LOG_KEY), 0, -1);

  return logs.map((data) => JSON.parse(data) as RedisLogType);
};

export { cacheLog, getLogsCache };
