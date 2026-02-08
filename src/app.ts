import cors from 'cors';
import express, { type Express, json, urlencoded } from 'express';
import type { ContextType } from './@types/context';
import ENV from './config/env.config';
import { healthController } from './controllers/health.controller';
import { errorMiddleware } from './middlewares/error.middleware';
import { requestInfoMiddleware } from './middlewares/info.middleware';
import { notFoundMiddleware } from './middlewares/not-found.middleware';
import apiRouter from './routes';
import type { UserType } from './schemas/auth.schema';

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

app.all('/health', healthController);

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
      user: UserType;
    }
  }
}

export default app;
