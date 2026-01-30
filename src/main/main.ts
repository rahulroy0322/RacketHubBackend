import cluster, { type Worker } from 'node:cluster';
import { availableParallelism, cpus } from 'node:os';
import type { ServerType } from '../@types/worker';
import { PORT } from '../config/env.config';
import { SHUTDOWN } from '../const/msg.const';
import logger from '../logger/pino';
import http from './http';
import './io';

const serverCpus = availableParallelism() || cpus().length;

const max = serverCpus - 1;
const maxRestarts = {
  SERVER: 4 * max,
  ADMIN: 4,
};

const restarts = {
  SERVER: 0,
  ADMIN: 0,
};

const maxTimeOut = 2500;

const serverTimeOut = 2000;

const idMap = new Map<`id-${number}`, ServerType>();

let port = PORT;

const fork = (type: ServerType) => {
  port++;

  const worker = cluster.fork({
    type,
    PORT: port,
  });

  worker.once('online', () => {
    idMap.set(`id-${worker.id}`, type);
    logger.info(
      {
        id: worker.id,
        type,
      },
      'new worker in online: '
    );
  });
};

const onExit = (worker: Worker, code: unknown, signal: unknown) => {
  const id = `id-${worker.id}` as const;
  const type = idMap.get(id) || 'SERVER';

  restarts[type]++;

  logger.error(
    {
      id: worker.id,
      type,
      code,
      signal,
    },
    `one worker id died:`
  );

  if (
    restarts.ADMIN > maxRestarts.ADMIN ||
    restarts.SERVER > maxRestarts.SERVER
  ) {
    logger.error(
      {
        restarts,
        maxRestarts,
      },
      'LOOP DETECTED!'
    );
    process.exit(0);
  }
  idMap.delete(`id-${worker.id}`);
  fork(type);
};

cluster.on('exit', onExit);

const close = async () => {
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

  await Promise.all([
    server.closeIdleConnections(),
    server.closeAllConnections(),
  ]);

  server.close((err) => {
    if (err) {
      logger.error(err, 'ERROR! in server close');
      process.exit(1);
    }
    process.exit(0);
  });
};

const server = http.listen(PORT, () => {
  logger.debug(`app is running on port : ${PORT}`);
});

process.once('SIGINT', close).once('SIGTERM', close);

for (let i = 0; i < max; i++) {
  fork('SERVER');
}

fork('ADMIN');
