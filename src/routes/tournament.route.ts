import { Router } from 'express';
import {
  createTournamentController,
  getAllTournamentsController,
  getTournamentByIdController,
} from '../controllers/tournaments.controller';

const tournamentsRouter: Router = Router();

tournamentsRouter
  .route('/')
  .get(getAllTournamentsController)
  .post(createTournamentController);

tournamentsRouter.get('/:id', getTournamentByIdController);

export default tournamentsRouter;
