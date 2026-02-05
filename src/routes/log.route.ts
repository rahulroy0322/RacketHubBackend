import { Router } from 'express';
import {
  getAllLogsController,
  moveLogsToDbController,
} from '../controllers/log.controller';
import { authRequired, roleRequired } from '../middlewares/auth.middleware';

const logsRouter: Router = Router();

logsRouter
  .route('/')
  .get(
    // TODO! add user check
    authRequired,
    roleRequired(['super', 'admin', 'modretor', 'tester']),
    getAllLogsController
  )
  // ? Just for render
  .post(
    // TODO! add user check
    authRequired,
    moveLogsToDbController
  );

export default logsRouter;
