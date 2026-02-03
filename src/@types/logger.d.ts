import type { ContextType } from './context';
import type { Prettify } from './utils';

type RedisErrorType = {
  type: string;
  message: string;
  stack?: string;
  name: string;
};

type _RedisLogType = {
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal';
  time: string;
  processId: number;
  appName: string;
  msg: string;
  path?: string;
  err?: RedisErrorType & {
    custom: {
      [key: string]: unknown;
    };
  };
  // biome-ignore lint/complexity/noBannedTypes: type only
} & (ContextType | {});

type RedisLogType = Prettify<
  {
    _id: string;
  } & _RedisLogType
>;

export type { RedisErrorType, _RedisLogType, RedisLogType };
