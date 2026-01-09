import mongoose from 'mongoose';
import { connectDb } from './config/db.config';
import { isDev, PORT } from './config/env.config';
import http from './http';
import { io } from './io';
import logger from './logger/pino';

const close = async () => {
  if (!server.listening || isDev) {
    process.exit(0);
  }

  await Promise.all([
    server.closeIdleConnections(),
    server.closeAllConnections(),
    mongoose.connection.close(),
    io.close(),
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
  logger.info(`app is running on port : ${PORT}`);

  connectDb(close);
});

process
  .on('SIGINT', close)
  // .on('SIGKILL', close)
  .on('SIGTERM', close);
