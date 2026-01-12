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
  .post(createTournamentController);

tournamentsRouter
  .route('/:id')
  .get(getTournamentByIdController)
  .patch(updateTournamentByIdController)
  .delete(destoryTournamentByIdController);

export default tournamentsRouter;
