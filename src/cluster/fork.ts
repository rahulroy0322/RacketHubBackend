import cluster from 'node:cluster';
import logger from '../logger/pino';

const fork = () => {
  const worker = cluster.fork();

  worker.once('listening', (address) => {
    logger.info(
      {
        id: worker.id,
        address,
      },
      'new worker is listening'
    );
  });
  worker.once('online', () => {
    logger.info(
      {
        id: worker.id,
      },
      'new worker is online'
    );
  });
};
export { fork };
