import mongoose from 'mongoose';
import type { ServerWithUrlType } from '../@types/worker';
import { closeCache, connectCache } from '../cache/main';
import { connectDb } from '../config/db.config';
import { isDev, PORT } from '../config/env.config';
import { SHUTDOWN } from '../const/msg.const';
import logger from '../logger/pino';
import http from './http';

const close = async () => {
  if (!server.listening || isDev) {
    process.exit(0);
  }

  await Promise.all([
    server.closeIdleConnections(),
    server.closeAllConnections(),
    mongoose.connection.close(),
    closeCache(),
  ]);
  server.close((err) => {
    if (err) {
      logger.error(err, 'ERROR! in admin server close');
      process.exit(1);
    }
    process.exit(0);
  });
};

const server = http.listen(PORT, () => {
  logger.info(`ADMIN app is running on port : ${PORT}`);

  process.send?.({
    port: PORT,
    type: 'ADMIN',
    url: `http://localhost:${PORT}`,
  } satisfies ServerWithUrlType);

  connectDb('ADMIN', close);
  connectCache('ADMIN');
});

process.on('message', (msg) => {
  if (msg === SHUTDOWN) {
    close();
  }
});

process.once('SIGINT', close).once('SIGTERM', close);
