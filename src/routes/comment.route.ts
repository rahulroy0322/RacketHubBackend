import { Router } from 'express';
import {
  createCommentByMatchIdController,
  getAllCommentsByMatchIdController,
} from '../controllers/comment.controller';

const commentsRouter: Router = Router();

commentsRouter
  .route('/:matchId')
  .get(getAllCommentsByMatchIdController)
  .post(createCommentByMatchIdController);

export default commentsRouter;
