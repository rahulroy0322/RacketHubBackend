import mongoose from 'mongoose';
import type { ServerType } from '../@types/worker';
import logger from '../logger/pino';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import ENV from './env.config';

const main = async (type: ServerType, cb: () => void) => {
  try {
    await Promise.all([
      Player.findOne(),
      Team.findOne(),
      Match.findOne(),
      Tournament.findOne(),
    ]);
  } catch (e) {
    logger.error(e, `${type} Db Init ERROR`);
    cb();
  }
};

const connectDb = async (type: ServerType, close = () => {}) => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    logger.debug(`${type} db conected`);
    await main(type, close);
  } catch (e) {
    logger.fatal(e, `${type} ERROR DB CONNECT: `);
    close();
  }
};

export { connectDb };
