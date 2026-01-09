import { Router } from 'express';
import commentsRouter from './comment.route';
import matchsRouter from './match.route';
import tournamentsRouter from './tournament.route';

const apiRouter: Router = Router();

apiRouter.use('/tournaments', tournamentsRouter);
apiRouter.use('/matches', matchsRouter);
apiRouter.use('/comments', commentsRouter);

export default apiRouter;
