import cluster from 'node:cluster';
import cors from 'cors';
import express, { type Express } from 'express';
import { createProxyServer } from 'http-proxy';
import type { ObjectId } from 'mongoose';
import type { ContextType } from '../@types/context';
import type { ServerWithUrlType } from '../@types/worker';
import ENV from '../config/env.config';
import { ServiceError } from '../error/app.error';
import logger from '../logger/pino';
import { errorMiddleware } from '../middlewares/error.middleware';
import { type _ServerType, selectServer } from './utils';

const app: Express = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URLS,
  })
);

const proxy = createProxyServer();

let adminServers: _ServerType[] = [];

let serviceServers: _ServerType[] = [];

app.use((req, res) => {
  let server = null;

  if (req.url.startsWith('/admin')) {
    server = selectServer(adminServers);

    if (!server) {
      throw new ServiceError('No Admin Server is listing!', {
        adminServers,
      });
    }

    if (adminServers.length > 1) {
      logger.error(
        {
          adminServers,
        },
        'Check server plz as multipal admin server is listning!'
      );
    }
  } else if (!serviceServers.length) {
    throw new ServiceError('No Server is listing!', {
      serviceServers,
    });
  } else {
    server = selectServer(serviceServers);
  }

  if (!server) {
    logger.error(
      {
        server,
        url: req.url,
        serviceServers,
        adminServers,
      },
      'This should not be called!'
    );

    throw new ServiceError();
  }

  server.requests++;
  server.activeRequests++;

  const start = process.hrtime();

  res.once('close', () => {
    const [, end] = process.hrtime(start);

    server.activeRequests--;

    server.avgResTime += end;
  });

  proxy.web(
    req,
    res,
    {
      target: server.url,
    },
    (err, req) => {
      logger.error(
        {
          err,
          url: req.url,
        },
        'Error in Proxy!'
      );
    }
  );
});

app.use(errorMiddleware);

cluster.on('message', (w, msg: string | ServerWithUrlType) => {
  if (typeof msg === 'object' && msg.url) {
    const data: _ServerType = {
      ...msg,
      id: w.id,
      requests: 0,
      activeRequests: 0,
      avgResTime: 0,
    };

    if (msg.type === 'ADMIN') {
      adminServers.push(data);
    } else {
      serviceServers.push(data);
    }
  }
});

cluster.on('exit', (w) => {
  adminServers = adminServers.filter((s) => s.id !== w.id);
  serviceServers = serviceServers.filter((s) => s.id !== w.id);
});

export default app;

declare global {
  // biome-ignore lint/suspicious/noRedeclare: my responsibilty
  namespace Express {
    interface Request {
      userId?: string;
      context: ContextType;
      trakingKey: ObjectId | string;
    }
  }
}
