import pino from 'pino';

import ENV, { isDev } from '../config/env.config';

const level: pino.LevelWithSilentOrString = isDev ? 'trace' : 'info';

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

targets.push({
  level,
  target: 'pino/file',

  options: {
    mkdir: true,
    destination: `./logs/applog-${ENV.PORT}-${process.env.type ?? 'MAIN'}.log`,
  },
});

const logger = pino({
  level,
  transport: {
    targets,
  },
});

const { trace, debug, info, warn, error, fatal } = logger;

export { trace, debug, info, warn, error, fatal, logger };

export default logger;
