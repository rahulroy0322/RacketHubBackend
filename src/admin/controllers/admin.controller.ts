import type { RequestHandler } from 'express';
import type { ResType } from '../../@types/res';
import { getAllCounts } from '../services/admin';

const getAllCountsController: RequestHandler = async (_req, res) => {
  const [tournaments, teams, matchs, players] = await getAllCounts();

  res.status(200).json({
    success: true,
    data: { players, matchs, teams, tournaments },
  } satisfies ResType);
};

export { getAllCountsController };
