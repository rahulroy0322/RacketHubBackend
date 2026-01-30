import { isDev } from '../config/env.config';
import type { UserType } from '../schemas/auth.schema';
import { CACHE_KEYS } from './keys';
import { getFromCache, setToCache } from './main';

const cacheUser = (user: UserType) =>
  setToCache(
    CACHE_KEYS.user(user._id),
    JSON.stringify({
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    } satisfies UserType),
    isDev ? 60 : 60 * 60
  );

const getUserCache = (id: UserType['_id']) =>
  getFromCache(CACHE_KEYS.user(id), true) as Promise<UserType | null>;

export { cacheUser, getUserCache };
