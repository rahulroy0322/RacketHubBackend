import type { QueryFilter } from 'mongoose';
import type { _RedisLogType, RedisLogType } from '../@types/logger';
import { Logger } from '../models/logger.model';

const createLogs = (log: _RedisLogType[]): Promise<RedisLogType | null> =>
  // @ts-expect-error
  Logger.create(log);

const getLogs = (filter: QueryFilter<_RedisLogType>): Promise<RedisLogType[]> =>
  Logger.find(filter);

export { createLogs, getLogs };
