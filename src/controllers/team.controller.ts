import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { teamSchema } from '../schemas/team.schema';
import { createTeam, getAllTeams } from '../services/team';

const getAllTeamsController: RequestHandler = async (_req, res) => {
  const teams = await getAllTeams();

  res.status(200).json({
    success: true,
    data: { teams },
  } satisfies ResType);
};

// const getMatchByIdController: RequestHandler<{
//   id: string;
// }> = async (req, res) => {
//   const match = await getMatchById(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: { match },
//   } satisfies ResType);
// };

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

// const patchMatchByIdController: RequestHandler<{
//   id: string;
// }> = async (req, res) => {

//   const vaild = matchUpdateSchema.safeParse(req.body)

//   if (!vaild.success) {
//     throw vaild.error
//   }

//   const match = await updateMatchById(req.params.id, vaild.data);

//   res.status(200).json({
//     success: true,
//     data: { match },
//   } satisfies ResType);
// };

export { createTeamController, getAllTeamsController };
