import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import {
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

export { getAllTournamentsController, getTournamentByIdController };
