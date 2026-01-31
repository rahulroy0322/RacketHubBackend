import cluster from 'node:cluster';
import { hostname, uptime } from 'node:os';
import logger from './logger/pino';

logger.info(
  {
    host: hostname(),
    uptime: uptime(),
  },
  `${cluster.isPrimary ? 'app' : 'new worker'} is started`
);

if (cluster.isPrimary) {
  import('./cluster/primary');
} else {
  import('./main');
}
