import z from 'zod';
import { tournamentStatus } from '../constants/status.const';

const tournamentSchema = z.object({
  name: z.string().min(3),
  location: z.string().min(5),
  description: z.string().optional(),
  status: z.enum(tournamentStatus),
  startDate: z.iso.date(),
  teams: z.array(z.string()).min(2),
});

const tournamentUpdateSchema = tournamentSchema.partial();

type TournamentType = z.infer<typeof tournamentSchema>;

export type { TournamentType };

export { tournamentSchema, tournamentUpdateSchema };
