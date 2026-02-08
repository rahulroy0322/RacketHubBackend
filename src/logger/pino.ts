import cluster from 'node:cluster';
import pino from 'pino';
import ENV, { isDev } from '../config/env.config';
import { LOG_KEY } from '../const/logger.const';

const level: pino.LevelWithSilentOrString = process.env.LEBEL
  ? ENV.LEBEL
  : isDev
    ? 'trace'
    : 'info';

const targets: pino.TransportTargetOptions<Record<string, unknown>>[] = [];

if (isDev) {
  targets.push({
    level,
    target: 'pino-pretty',
    options: {
      colorize: true,
      minimumLevel: level,
    },
  });
}

// TODO? for vps only
// targets.push({
//   level,
//   target: 'pino/file',

//   options: {
//     mkdir: true,
//     destination: `./logs/applog.log`,
//   },
// });

targets.push({
  level,
  target: './redis',
  options: {
    key: LOG_KEY,
  },
});

const logger = pino({
  level,
  transport: {
    targets,
  },
  base: {
    processId: process.pid,
    appName: `RacketHub Backend ${cluster.isPrimary ? 'Main' : 'Process'}`,
  },
  redact: {
    paths: ['password', 'passwd', 'pass'],
    censor: '[{HIDEN}]',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

const { trace, debug, info, warn, error, fatal } = logger;

export { trace, debug, info, warn, error, fatal, logger };

export default logger;
