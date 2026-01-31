import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { playerSchema } from '../schemas/player.schema';
import { createPlayer, getAllPlayers } from '../services/player';

// Todo! move to admin?
const getAllPlayersController: RequestHandler = async (_req, res) => {
  const players = await getAllPlayers();

  res.status(200).json({
    success: true,
    data: { players },
  } satisfies ResType);
};

// Todo! move to admin?
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

export { createPlayerController, getAllPlayersController };
