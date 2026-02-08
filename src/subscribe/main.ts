import Redis from 'ioredis';
import ENV from '../config/env.config';
import logger from '../logger/pino';
import { PUB_KEY } from './const';

const pub = new Redis(ENV.PUB_SUB);
const sub = new Redis(ENV.PUB_SUB);

pub.on('connect', () => {
  logger.trace('pub connected');
});

sub.on('connect', () => {
  logger.trace('sub connected');
});

type RedisCommentType = {
  matchId: string;
} & {
  [key: string]: string;
};

const pubMsg = (msg: RedisCommentType) => {
  pub.publish(PUB_KEY, JSON.stringify(msg));
};

const closePubSub = () => {
  pub.disconnect(false);
  sub.disconnect(false);
};

export type { RedisCommentType };

export { pubMsg, closePubSub, sub };
