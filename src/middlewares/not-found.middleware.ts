import type { RequestHandler } from 'express';

const notFoundMiddleware: RequestHandler = (req, res) => {
  res.status(404);
  throw new Error(`route not found : "${req.url}"!`);
};

export { notFoundMiddleware };
