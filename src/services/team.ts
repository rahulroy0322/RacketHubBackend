import { Team } from '../models/team.model';
import type { TeamType } from '../schemas/team.schema';

const getAllTeams = (): Promise<TeamType[]> => Team.find();

const createTeam = (team: TeamType): Promise<TeamType | null> =>
  Team.create(team);

export { createTeam, getAllTeams };
