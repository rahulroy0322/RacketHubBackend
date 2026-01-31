import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { teamSchema } from '../schemas/team.schema';
import { createTeam, getAllTeams } from '../services/team';

// Todo! move to admin?
const getAllTeamsController: RequestHandler = async (_req, res) => {
  const teams = await getAllTeams();

  res.status(200).json({
    success: true,
    data: { teams },
  } satisfies ResType);
};

// Todo! move to admin?
const createTeamController: RequestHandler = async (req, res) => {
  const vaild = teamSchema.safeParse(req.body);

  if (!vaild.success) {
    throw vaild.error;
  }

  const team = await createTeam(vaild.data);

  res.status(200).json({
    success: true,
    data: { team },
  } satisfies ResType);
};

export { createTeamController, getAllTeamsController };
