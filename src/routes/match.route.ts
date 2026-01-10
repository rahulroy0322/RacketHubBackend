import { Router } from 'express';
import {
  createMatchController,
  getAllMatchsByTournamentIdController,
  getAllMatchsController,
  getMatchByIdController,
  patchMatchByIdController,
} from '../controllers/match.controller';

const matchsRouter: Router = Router();

matchsRouter.route('/').get(getAllMatchsController).post(createMatchController);

matchsRouter
  .route('/:id')
  .get(getMatchByIdController)
  .patch(patchMatchByIdController);

matchsRouter.get(
  '/:tournamentId/matches',
  getAllMatchsByTournamentIdController
);

export default matchsRouter;
