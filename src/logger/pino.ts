import cluster from 'node:cluster';
import pino from 'pino';
import ENV, { isDev } from '../config/env.config';

const level: pino.LevelWithSilentOrString = process.env.LEVEL
  ? ENV.LEBEL
  : isDev
    ? 'trace'
    : 'info';

const targets: pino.TransportTargetOptions<Record<string, unknown>>[] = [];

// TODO? only for render
// if (isDev) {
targets.push({
  level,
  target: 'pino-pretty',
  options: {
    colorize: true,
    minimumLevel: level,
  },
});
// }

targets.push({
  level,
  target: 'pino/file',

  options: {
    mkdir: true,
    destination: `./logs/applog.log`,
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
});

const { trace, debug, info, warn, error, fatal } = logger;

export { trace, debug, info, warn, error, fatal, logger };

export default logger;
