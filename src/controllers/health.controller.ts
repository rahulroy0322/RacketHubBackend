import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { getHealthData } from '../utils/health';

const healthController: RequestHandler = (_req, res) => {
  res.status(200).json({
    success: true,
    data: getHealthData(),
  } satisfies ResType);
};

export { healthController };
