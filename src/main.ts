import mongoose from 'mongoose';
import { closeCache } from './cache/listener';
import { connectCache } from './cache/main';
import { connectDb } from './config/db.config';
import { isDev, PORT } from './config/env.config';
import { SHUTDOWN } from './const/msg.const';
import http from './http';
import { io } from './io';
import logger from './logger/pino';
import { closePubSub } from './subscribe/main';

const close = async () => {
  if (!server.listening || isDev) {
    process.exit(0);
  }

  await Promise.all([
    server.closeIdleConnections(),
    server.closeAllConnections(),
    mongoose.connection.close(),
    io.close(),
    closePubSub(),
    closeCache(),
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
  logger.debug(`SERVER app is running on port : ${PORT}`);
  connectDb(close);
  connectCache();
});

process.on('message', (msg) => {
  if (msg === SHUTDOWN) {
    close();
  }
});

process.once('SIGINT', close).once('SIGTERM', close);
