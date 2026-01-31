import cors from 'cors';
import express, { type Express, json, urlencoded } from 'express';
import type { ContextType } from './@types/context';
import ENV from './config/env.config';
import { errorMiddleware } from './middlewares/error.middleware';
import { requestInfoMiddleware } from './middlewares/info.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import apiRouter from './routes';

const app: Express = express();

app.use(
  cors({
    origin: ENV.FRONTEND_URLS,
  })
);
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

// req-> info
app.use(requestInfoMiddleware);

// api routes
app.use('/api/v1', apiRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

declare global {
  // biome-ignore lint/suspicious/noRedeclare: my responsibilty
  namespace Express {
    interface Request {
      userId?: string;
      context: ContextType;
    }
  }
}

export default app;
