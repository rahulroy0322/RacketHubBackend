import { Router } from 'express';
import { authRequired } from '../../middlewares/auth.middleware';
import {
  getProfileController,
  loginController,
  registerController,
} from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.route('/me').get(authRequired, getProfileController);

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);

export default authRouter;
