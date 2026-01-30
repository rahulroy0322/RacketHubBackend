import { Team } from '../../models/team.model';
import type { _TeamType, TeamType } from '../../schemas/team.schema';

const getAllTeams = (): Promise<TeamType[]> => Team.find();

const createTeam = (team: _TeamType): Promise<TeamType | null> =>
  // @ts-expect-error
  Team.create(team);

export { createTeam, getAllTeams };
