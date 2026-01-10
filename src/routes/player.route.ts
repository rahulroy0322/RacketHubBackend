import { Router } from 'express';
import {
  createPlayerController,
  getAllPlayersController,
} from '../controllers/player.controller';

const playersRouter: Router = Router();

playersRouter
  .route('/')
  .get(getAllPlayersController)
  .post(createPlayerController);

// playersRouter
//   .route('/:matchId')
//   .get(getAllCommentsByMatchIdController)
//   .post(createCommentByMatchIdController);

export default playersRouter;
