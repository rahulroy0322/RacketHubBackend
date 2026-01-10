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

const createTournament = (
  tournament: TournamentType
): Promise<TournamentType | null> =>
  // @ts-expect-error
  Tournament.create(tournament);

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

export { getAllTournaments, getTeamsTournamentById, createTournament };
