import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { matchSchema, matchUpdateSchema } from '../schemas/match.schema';
import {
  createMatch,
  getAllMatchs,
  getMatchById,
  updateMatchById,
} from '../services/match';

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

const createMatchController: RequestHandler = async (req, res) => {
  const vaild = matchSchema.safeParse(req.body);

  if (!vaild.success) {
    throw vaild.error;
  }

  const match = await createMatch(vaild.data);

  res.status(200).json({
    success: true,
    data: { match },
  } satisfies ResType);
};

const patchMatchByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const vaild = matchUpdateSchema.safeParse(req.body);

  if (!vaild.success) {
    throw vaild.error;
  }

  const match = await updateMatchById(req.params.id, vaild.data);

  res.status(200).json({
    success: true,
    data: { match },
  } satisfies ResType);
};

const getAllMatchsController: RequestHandler = async (_req, res) => {
  const matchs = await getAllMatchs();

  res.status(200).json({
    success: true,
    data: { matchs },
  } satisfies ResType);
};

export {
  getAllMatchsByTournamentIdController,
  getMatchByIdController,
  patchMatchByIdController,
  createMatchController,
  getAllMatchsController,
};
