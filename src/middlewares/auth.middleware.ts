import type { RequestHandler } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import type { ResType } from '../@types/res';
import type { RoleType } from '../const/role.const';
import logger from '../logger/pino';
import { getUserById } from '../services/auth';
import { verifyToken } from '../utils/token';

const authRequired: RequestHandler = (req, res, next) => {
  const token = (
    req.headers.Authorization ||
    req.headers.authorization ||
    req.headers['x-Authorization'] ||
    req.headers['x-authorization'] ||
    req.headers.token ||
    req.headers['x-token'] ||
    ''
  )
    .toString()
    .split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        name: 'Login Required',
        message: 'You have to login first!',
      },
    } satisfies ResType);
  }

  try {
    const { _id } = verifyToken(token);
    // TODO! check for baned
    req.userId = _id;
    return next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return res.status(401).json({
        success: false,
        error: {
          name: 'Token Expired!',
          message: 'your session had expired now you have to login again!',
        },
      } satisfies ResType);
    }

    return res.status(400).json({
      success: false,
      error: {
        name: 'Token Error',
        message: 'failed To vaify token!',
      },
    } satisfies ResType);
  }
};

const roleRequired = (roles: RoleType[]) => {
  return (async (req, res, next) => {
    if (!req.userId) {
      throw new Error("some event dosn't handled properly!");
    }

    // TODO! check cache!
    const user = await getUserById(req.userId);

    if (!user) {
      res.status(400);
      logger.error({ user, userId: req.userId }, 'User Not found!');

      throw new Error('your account had been deleted!');
    }

    if (!roles.includes(user.role)) {
      res.status(403);
      throw new Error("You Don't Sufficient permition");
    }
    next();
  }) satisfies RequestHandler;
};

export { roleRequired, authRequired };
