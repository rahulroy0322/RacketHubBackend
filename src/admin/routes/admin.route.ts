import { Router } from 'express';
import { authRequired, roleRequired } from '../../middlewares/auth.middleware';
import {
  getAllCountsController,
  // getAllMatchsController,
} from '../controllers/admin.controller';

const adminRouter: Router = Router();

adminRouter
  .route('/count')
  .get(authRequired, roleRequired(['super', 'admin']), getAllCountsController);

export default adminRouter;
