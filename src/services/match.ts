import { Match } from '../models/match.model';
import type { MatchType } from '../schemas/match.schema';

const getAllMatchs = (tournamentId: string): Promise<MatchType[]> =>
  Match.find({
    tournamentId,
  }).populate({
    path: 'teamAId teamBId',
  });

const getMatchById = (id: string): Promise<MatchType | null> =>
  Match.findById(id).populate({
    path: 'teamAId teamBId',
    populate: {
      path: 'players',
    },
  });

export { getAllMatchs, getMatchById };
