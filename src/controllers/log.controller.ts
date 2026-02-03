import type { RequestHandler } from 'express';
import type { _RedisLogType } from '../@types/logger';
import type { ResType } from '../@types/res';
import { getLogsCache } from '../cache/logger';
import type { RoleType } from '../const/role.const';
import { ServerError } from '../error/app.error';
import type { UserType } from '../schemas/auth.schema';
import { redis } from '../cache/main';
import { CACHE_KEYS } from '../cache/keys';
import { LOG_KEY } from '../const/logger.const';
import { createLogs, getLogs } from '../services/logger';
import logger from '../logger/pino';
import type { QueryFilter } from 'mongoose';

/*
by chatgpt
await redis.call("JSON.SET", "log:1", "$", JSON.stringify({
  level: "debug",
  time: "...",
  msg: "this is debug"
}));

FT.SEARCH idx:logs '@level:(debug|info)'

const result = await redis.call(
  "FT.SEARCH",
  "idx:logs",
  "@level:(debug|info)"
);
console.log(result);
*/

const roleLebelMap: Record<RoleType, _RedisLogType['level'][] | null> = {
  user: [],
  tester: ['info', 'debug'],
  modretor: ['info', 'debug', 'warn'],
  admin: ['info', 'debug', 'warn', 'error'],
  super: null,
};

const getLogsByUserRole = async (
  user: Pick<UserType, 'role'>
): Promise<_RedisLogType[]> => {
  const logs = await getLogsCache();

  if (!logs) {
    return [];
  }

  const lebels = roleLebelMap[user.role];

  if (!lebels) {
    return logs;
  }

  return logs.filter((log) => lebels.includes(log.level));
};

const getAllLogsController: RequestHandler = async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ServerError();
  }

  const filter: QueryFilter<_RedisLogType> = {}

  const lebels = roleLebelMap[user.role];

  if (lebels) {
    filter.level = {
      $in: lebels
    }
  }

  const logs = await Promise.all(
    [getLogsByUserRole(user),
    getLogs(filter)
    ]
  )

  res.status(200).json({
    success: true,
    data: {
      logs: logs.flat(),
      length: {
        caches: logs[0].length,
        main: logs[1].length,
      },
    },
  } satisfies ResType);
};


const batchSize = 50

// * render h*ck
const moveToDb = async (loop = 0) => {
  const key = CACHE_KEYS.log(
    LOG_KEY
  )
  const logs = await redis.lrange(
    key, batchSize * -1, -1
  )

  await createLogs(logs.map((log) => (
    JSON.parse(log) as _RedisLogType
  )))
  //TODO! try to optomize
  await Promise.all(
    logs.map((log) =>
      redis.lrem(
        key, 0, log
      )
    )
  )

  if (loop <= 5) {
    if (logs.length >= batchSize) {
      moveToDb()
    }
  }
}

const moveLogsToDbController: RequestHandler = async (req, res) => {
  res.status(202).json({
    success: true,
    data: {
      msg: 'starting process',
    },
  } satisfies ResType);

  try {
    await moveToDb()

    // biome-ignore lint/suspicious/noConsole: just for dont want to in db
    console.info('moving log to db complated!')
  } catch (err) {
    logger.error(err, `Error moving log to db: ${req.context.reqId}`)
  }


  // console.log({
  //   logs,
  // });

  // const user = req.user;
  // if (!user) {
  //   throw new ServerError();
  // }

  // const logs = await getLogsByUserRole(user);

  // res.status(200).json({
  //   success: true,
  //   data: {
  //     logs,
  //     length: {
  //       caches: logs.length,
  //       // main: main.length,
  //     },
  //   },
  // } satisfies ResType);
};
export { getAllLogsController, moveLogsToDbController };
