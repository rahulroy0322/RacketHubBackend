import { Match } from '../models/match.model';
import { Player } from '../models/player.model';
import { Team } from '../models/team.model';
import { Tournament } from '../models/tournament.model';

const getAllCounts = () => {
  return Promise.all([
    Tournament.countDocuments(),
    Team.countDocuments(),
    Match.countDocuments(),
    Player.countDocuments(),
  ]);
};

export { getAllCounts };
