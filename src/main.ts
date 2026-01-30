import cluster from 'node:cluster';
import type { ServerType } from './@types/worker';

if (cluster.isPrimary) {
  import('./main/main');
} else {
  const type = process.env.type as ServerType;
  if (type === 'ADMIN') {
    import('./admin/main');
  } else {
    import('./server/main');
  }
}
