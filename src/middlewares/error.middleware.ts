import type { ErrorRequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { isDev } from '../config/env.config';
import logger from '../logger/pino';

const errorMiddleware: ErrorRequestHandler = (e, _req, res, _next) => {
  if (!isDev) {
    logger.info(e, 'remove extra from error');
    delete e.stack;
  } else {
    logger.error(e);
  }

  let status = 500;

  if (e.status) {
    status = e.status;
  } else {
    if (res.statusCode !== 200) {
      status = res.statusCode;
    }
  }

  res.status(status).json({
    success: false,
    error: {
      ...e,
    },
  } satisfies ResType);
};

export { errorMiddleware };
