import type { MatchStatusType } from '../constants/status.const';
import { Match } from '../models/match.model';
import type { MatchType } from '../schemas/match.schema';

const getAllMatchs = (
  tournamentId: string | undefined = undefined
): Promise<MatchType[]> =>
  Match.find({
    ...(tournamentId ? { tournamentId } : {}),
    status: {
      $ne: 'completed' satisfies MatchStatusType,
    },
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

const createMatch = (match: MatchType): Promise<MatchType | null> =>
  Match.create(match);

const updateMatchById = (
  id: string,
  data: Partial<MatchType>
): Promise<MatchType | null> =>
  Match.findByIdAndUpdate(id, data, {
    new: true,
  }).populate({
    path: 'teamAId teamBId',
    populate: {
      path: 'players',
    },
  });

export { getAllMatchs, getMatchById, updateMatchById, createMatch };
