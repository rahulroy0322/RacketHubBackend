import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { playerSchema } from '../schemas/player.schema';
import { createPlayer, getAllPlayers } from '../services/player';

const getAllPlayersController: RequestHandler = async (_req, res) => {
  const players = await getAllPlayers();

  res.status(200).json({
    success: true,
    data: { players },
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

const createPlayerController: RequestHandler = async (req, res) => {
  const vaild = playerSchema.safeParse(req.body);

  if (!vaild.success) {
    throw vaild.error;
  }

  const player = await createPlayer(vaild.data);

  res.status(200).json({
    success: true,
    data: { player },
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

export { createPlayerController, getAllPlayersController };
