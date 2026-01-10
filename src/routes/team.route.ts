import { Router } from 'express';
import {
  createTeamController,
  getAllTeamsController,
} from '../controllers/team.controller';

const teamsRouter: Router = Router();

teamsRouter.route('/').get(getAllTeamsController).post(createTeamController);

export default teamsRouter;
