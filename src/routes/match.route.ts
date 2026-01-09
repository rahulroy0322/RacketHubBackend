import { Router } from 'express';
import {
  getAllMatchsByTournamentIdController,
  getMatchByIdController,
} from '../controllers/match.controller';

const matchsRouter: Router = Router();

matchsRouter.get('/:id', getMatchByIdController);
matchsRouter.get(
  '/:tournamentId/matches',
  getAllMatchsByTournamentIdController
);

export default matchsRouter;
