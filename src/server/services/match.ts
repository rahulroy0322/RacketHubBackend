import type { MatchStatusType } from '../../const/status.const';
import { Match } from '../../models/match.model';
import type { _MatchType, MatchType } from '../../schemas/match.schema';

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
  }) as unknown as Promise<MatchType[]>;

const getMatchById = (id: string): Promise<MatchType | null> =>
  Match.findById(id, {
    comments: {
      $slice: [0, 1],
    },
  }).populate({
    path: 'teamAId teamBId',
    populate: {
      path: 'players',
    },
  }) as unknown as Promise<MatchType>;

const createMatch = (match: _MatchType): Promise<MatchType | null> =>
  // @ts-expect-error
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
  }) as unknown as Promise<MatchType>;

export { getAllMatchs, getMatchById, updateMatchById, createMatch };
