import mongoose from 'mongoose';
import logger from '../logger/pino';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import ENV from './env.config';

const main = async (cb: () => void) => {
  try {
    await Promise.all([
      Player.findOne(),
      Team.findOne(),
      Match.findOne(),
      Tournament.findOne(),
    ]);
  } catch (e) {
    logger.error(e, `Db Init ERROR`);
    cb();
  }
};

const connectDb = async (close = () => {}) => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    logger.debug(`db conected`);
    await main(close);
  } catch (e) {
    logger.fatal(e, `ERROR DB CONNECT: `);
    close();
  }
};

export { connectDb };
