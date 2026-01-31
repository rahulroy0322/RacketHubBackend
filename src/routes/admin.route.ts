import { Router } from 'express';
import {
  getAllCountsController,
  // getAllMatchsController,
} from '../controllers/admin.controller';
import { authRequired, roleRequired } from '../middlewares/auth.middleware';

const adminRouter: Router = Router();

adminRouter
  .route('/count')
  .get(authRequired, roleRequired(['super', 'admin']), getAllCountsController);

export default adminRouter;
