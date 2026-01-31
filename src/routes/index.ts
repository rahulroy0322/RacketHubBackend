import { Router } from 'express';
import adminRouter from './admin.route';
import authRouter from './auth.route';
import commentsRouter from './comment.route';
import matchsRouter from './match.route';
import playersRouter from './player.route';
import teamsRouter from './team.route';
import tournamentsRouter from './tournament.route';

const apiRouter: Router = Router();

apiRouter.use('/admin', adminRouter);
apiRouter.use('/auth', authRouter);

apiRouter.use('/tournaments', tournamentsRouter);
apiRouter.use('/matches', matchsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/players', playersRouter);
apiRouter.use('/teams', teamsRouter);

export default apiRouter;
