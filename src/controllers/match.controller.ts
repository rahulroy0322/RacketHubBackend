import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { getAllMatchs, getMatchById } from '../services/match';

const getAllMatchsByTournamentIdController: RequestHandler<{
  tournamentId: string;
}> = async (req, res) => {
  const matchs = await getAllMatchs(req.params.tournamentId);

  res.status(200).json({
    success: true,
    data: { matchs },
  } satisfies ResType);
};

const getMatchByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const match = await getMatchById(req.params.id);

  res.status(200).json({
    success: true,
    data: { match },
  } satisfies ResType);
};

export { getAllMatchsByTournamentIdController, getMatchByIdController };
