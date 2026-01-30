import { Router } from 'express';
import {
  createMatchController,
  getAllMatchsByTournamentIdController,
  getAllMatchsController,
  getMatchByIdController,
  patchMatchByIdController,
  startMatchByIdController,
} from '../controllers/match.controller';

const matchsRouter: Router = Router();

matchsRouter
  .route('/')
  .get(getAllMatchsController)
  // TODO! check auth!
  .post(createMatchController);

matchsRouter
  .route('/:id')
  .get(getMatchByIdController)
  // TODO! check auth!
  .patch(patchMatchByIdController);

matchsRouter
  .route('/:id/start')
  // TODO! check auth!
  .post(startMatchByIdController);

matchsRouter.get(
  '/:tournamentId/matches',
  getAllMatchsByTournamentIdController
);

export default matchsRouter;
