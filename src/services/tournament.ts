import type { TournamentStatusType } from '../constants/status.const';
import { Tournament } from '../models/tournament.model';
import type { TournamentType } from '../schemas/tournament.schema';

const getAllTournaments = (): Promise<TournamentType[]> =>
  Tournament.find({
    status: {
      $not: {
        $eq: 'completed' as TournamentStatusType,
      },
    },
  });

const getTeamsTournamentById = async (
  id: string
): Promise<TournamentType | null> =>
  (
    await Tournament.findById(id).populate({
      path: 'teams',
      populate: {
        path: 'players',
      },
    })
  )?.toJSON() as unknown as TournamentType | null;

export { getAllTournaments, getTeamsTournamentById };
