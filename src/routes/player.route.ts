import { Router } from 'express';
import {
  createPlayerController,
  getAllPlayersController,
} from '../controllers/player.controller';

const playersRouter: Router = Router();

playersRouter
  .route('/')
  .get(getAllPlayersController)
  // TODO! check auth!
  .post(createPlayerController);

export default playersRouter;
