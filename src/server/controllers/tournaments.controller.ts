import type { RequestHandler } from 'express';
import type { ResType } from '../../@types/res';
import {
  tournamentSchema,
  tournamentUpdateSchema,
} from '../../schemas/tournament.schema';
import {
  createTournament,
  destoryTournamentById,
  getAllTournaments,
  getTeamsTournamentById,
  updateTournamentById,
} from '../services/tournament';

const getAllTournamentsController: RequestHandler = async (req, res) => {
  const tournaments = await getAllTournaments(req.query.all === 'true');

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

// Todo! move to admin?
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

// Todo! move to admin?
const updateTournamentByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const vaild = tournamentUpdateSchema.safeParse(req.body);

  if (!vaild.success) {
    throw vaild.error;
  }

  const tournament = await updateTournamentById(req.params.id, vaild.data);

  res.status(200).json({
    success: true,
    data: { tournament },
  } satisfies ResType);
};

const destoryTournamentByIdController: RequestHandler<{
  id: string;
}> = async (req, res) => {
  const tournament = await destoryTournamentById(req.params.id);

  res.status(200).json({
    success: true,
    data: { tournament },
  } satisfies ResType);
};

export {
  getAllTournamentsController,
  getTournamentByIdController,
  createTournamentController,
  updateTournamentByIdController,
  destoryTournamentByIdController,
};
