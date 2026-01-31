import { Router } from 'express';
import {
  createTeamController,
  getAllTeamsController,
} from '../controllers/team.controller';

const teamsRouter: Router = Router();

teamsRouter
  .route('/')
  .get(getAllTeamsController)
  // TODO! check auth!
  .post(createTeamController);

export default teamsRouter;
