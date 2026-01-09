import { Router } from 'express';
import {
  getAllTournamentsController,
  getTournamentByIdController,
} from '../controllers/tournaments.controller';

const tournamentsRouter: Router = Router();

tournamentsRouter.get('/', getAllTournamentsController);
tournamentsRouter.get('/:id', getTournamentByIdController);

export default tournamentsRouter;
