import { levels } from 'pino';
import build from 'pino-abstract-transport';
import type { _RedisLogType, RedisErrorType } from '../@types/logger';
import { cacheLog } from '../cache/logger';
import { connectCache } from '../cache/main';
import { getPrevLogs, setPrevLogs } from '../cache/prevData';

const { labels } = levels;

type DataType = Pick<
  _RedisLogType,
  'appName' | 'msg' | 'processId' | 'time'
> & {
  level: keyof typeof labels;
  err?: RedisErrorType;
};

const pinoRedis = ({ key }: { key: string }) => {
  const redis = connectCache();
  redis.on('ready', async () => {
    const prevLogs = getPrevLogs();
    setPrevLogs([]);

    try {
      await Promise.all(
        prevLogs.map((log) =>
          cacheLog({
            ...log,
            redis,
          })
        )
      );
    } catch (err) {
      const logs = getPrevLogs();

      setPrevLogs(prevLogs.concat(logs));

      console.error('Error loging to redis', err);
    }
  });

  return build((source) => {
    source.on('data', ({ err, level, ...obj }: DataType) => {
      const data: _RedisLogType = {
        ...obj,
        level: labels[level] as _RedisLogType['level'],
      };

      if (err) {
        const { message, name, type, stack, ...custom } = err;
        data.err = {
          message,
          name,
          type,
          stack,
          custom,
        };
      }

      cacheLog({
        redis,
        key,
        data,
      });
    });
  });
};

export default pinoRedis;
