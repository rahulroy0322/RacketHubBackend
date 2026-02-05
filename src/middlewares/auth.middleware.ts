import type { RequestHandler } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import type { RoleType } from '../const/role.const';
import {
  BadError,
  ExpiredError,
  ForbidenError,
  ServerError,
  UnAuthenticatedError,
} from '../error/app.error';
import { getUserById } from '../services/auth';
import { verifyToken } from '../utils/token';

const authRequired: RequestHandler = (req, _res, next) => {
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
    throw new UnAuthenticatedError('You have to login first!');
  }

  try {
    const { _id } = verifyToken(token);
    // TODO! check for baned
    req.userId = _id;
    return next();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      throw new ExpiredError(
        'your session had expired now you have to login again!'
      );
    }

    throw new BadError('failed To vaify token!', e);
  }
};

const roleRequired = (roles: RoleType[]) => {
  return (async (req, _res, next) => {
    if (!req.userId) {
      throw new ServerError("some event dosn't handled properly!");
    }

    // TODO! check cache!
    const user = await getUserById(req.userId);

    if (!user) {
      // res.status(401);
      // Todo!
      // logger.error({ user, userId: req.userId }, 'User Not found!');

      throw new UnAuthenticatedError('Your account had been deleted!');
    }

    if (!roles.includes(user.role)) {
      // res.status(403);
      // Todo!
      throw new ForbidenError("You Don't Sufficient permition");
    }

    req.user = user;

    next();
  }) satisfies RequestHandler;
};

export { roleRequired, authRequired };
