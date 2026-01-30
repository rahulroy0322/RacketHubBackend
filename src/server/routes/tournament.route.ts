import { Router } from 'express';
import {
  createTournamentController,
  destoryTournamentByIdController,
  getAllTournamentsController,
  getTournamentByIdController,
  updateTournamentByIdController,
} from '../controllers/tournaments.controller';

const tournamentsRouter: Router = Router();

tournamentsRouter
  .route('/')
  .get(getAllTournamentsController)
  // TODO! check auth!
  .post(createTournamentController);

tournamentsRouter
  .route('/:id')
  .get(getTournamentByIdController)
  // TODO! check auth!
  .patch(updateTournamentByIdController)
  // TODO! check auth!
  .delete(destoryTournamentByIdController);

export default tournamentsRouter;
