import mongoose from 'mongoose';
import logger from '../logger/pino';
// import { Commentary } from '../models/comentary.model'
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';
import ENV from './env.config';

const main = async (cb: () => void) => {
  try {
    await Promise.all([
      // Commentary.findOne(),
      Match.findOne(),
      Player.findOne(),
      Team.findOne(),
      Tournament.findOne(),
    ]);
  } catch (e) {
    logger.error(e, 'Db Init ERROR');
    cb();
  }
};

const connectDb = async (close = () => {}) => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    logger.info('db conected');
    await main(close);
  } catch (e) {
    logger.error(e, 'ERROR DB CONNECT: ');
    close();
  }
};

export { connectDb };
