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
      logger.error(err, 'ERROR! in server close');
      process.exit(1);
    }
    process.exit(0);
  });
};

const server = http.listen(PORT, () => {
  logger.debug(`SERVER app is running on port : ${PORT}`);
  process.send?.({
    port: PORT,
    type: 'SERVER',
    url: `http://localhost:${PORT}`,
  } satisfies ServerWithUrlType);

  connectDb('SERVER', close).then(() => {
    // User.findByIdAndUpdate('697c6a2b12ed4e3a0ced8e84', {
    //   role: 'super'
    // },{
    //   new:true
    // }).then(console.log)
  });
  connectCache('SERVER');
});

process.on('message', (msg) => {
  if (msg === SHUTDOWN) {
    close();
  }
});

process.once('SIGINT', close).once('SIGTERM', close);
