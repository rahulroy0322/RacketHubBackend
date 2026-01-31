import cluster, { type Worker } from 'node:cluster';
import { availableParallelism, cpus } from 'node:os';
import { SHUTDOWN } from '../const/msg.const';
import logger from '../logger/pino';
import { fork } from './fork';

const serverCpus = availableParallelism() || cpus().length;

const max = serverCpus;
const maxRestarts = 4 * max; // 4 is times to restart

const maxTimeOut = 2500;
const serverTimeOut = 2000;

let restarts = 0;

let stop = false;

const onExit = (worker: Worker, code: unknown, signal: unknown) => {
  restarts++;

  logger.error(
    {
      id: worker.id,
      code,
      signal,
    },
    `one worker id died:`
  );

  if (restarts > maxRestarts) {
    logger.error(
      {
        restarts,
        maxRestarts,
      },
      'LOOP DETECTED!'
    );
    process.exit(0);
  }
  // *For extra sefty
  if (!stop) {
    fork();
  }
};

cluster.on('setup', (settings) => {
  logger.info(
    {
      settings,
    },
    'cluster setup'
  );
});

cluster.on('exit', onExit);
const close = () => {
  stop = true;
  cluster.off('exit', onExit);
  setTimeout(() => {
    logger.info('quiting forcefully!');
    process.exit(0);
  }, maxTimeOut);

  Object.values(cluster.workers || {}).forEach((worker) => {
    worker?.send(SHUTDOWN);
    setTimeout(() => {
      worker?.kill();
    }, serverTimeOut);
  });
};

process.once('SIGINT', close).once('SIGTERM', close);

for (let i = 0; i < max; i++) {
  fork();
}
