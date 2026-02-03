type RedisErrorType = {
  type: string;
  message: string;
  stack?: string;
  name: string;
};

type RedisLogType = {
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
};

export type { RedisErrorType, RedisLogType };
