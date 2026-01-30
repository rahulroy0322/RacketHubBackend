import { Router } from 'express';
import adminRouter from './admin.route';

const apiRouter: Router = Router();

apiRouter.use('/admin', adminRouter);

export default apiRouter;
