import type { TournamentStatusType } from '../constants/status.const';
import { Tournament } from '../models/tournament.model';
import type { TournamentType } from '../schemas/tournament.schema';

const getAllTournaments = (all = false): Promise<TournamentType[]> =>
  Tournament.find({
    ...(all
      ? {}
      : {
          status: {
            $not: {
              $eq: 'completed' as TournamentStatusType,
            },
          },
        }),
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

const updateTournamentById = (
  id: string,
  data: Partial<TournamentType>
): Promise<TournamentType | null> =>
  Tournament.findByIdAndUpdate(id, data, {
    new: true,
  }).populate({
    path: 'teams',
    populate: {
      path: 'players',
    },
  });

const destoryTournamentById = (id: string): Promise<TournamentType | null> =>
  Tournament.findByIdAndDelete(id, {
    new: true,
  }).populate({
    path: 'teams',
    populate: {
      path: 'players',
    },
  });

export {
  getAllTournaments,
  getTeamsTournamentById,
  createTournament,
  updateTournamentById,
  destoryTournamentById,
};
