import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { tournamentSchema } from '../schemas/tournament.schema';
import {
  createTournament,
  getAllTournaments,
  getTeamsTournamentById,
} from '../services/tournament';

const getAllTournamentsController: RequestHandler = async (_, res) => {
  const tournaments = await getAllTournaments();

  res.status(200).json({
    success: true,
    data: { tournaments },
  } satisfies ResType);
};

const getTournamentByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const tournament = await getTeamsTournamentById(req.params.id);

  res.status(200).json({
    success: true,
    data: { tournament },
  } satisfies ResType);
};

const createTournamentController: RequestHandler = async (req, res) => {
  const vaild = tournamentSchema.safeParse(req.body);

  if (!vaild.success) {
    throw vaild.error;
  }

  const tournament = await createTournament(vaild.data);

  res.status(200).json({
    success: true,
    data: { tournament },
  } satisfies ResType);
};

export {
  getAllTournamentsController,
  getTournamentByIdController,
  createTournamentController,
};
