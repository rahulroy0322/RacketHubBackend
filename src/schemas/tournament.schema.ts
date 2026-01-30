import z from 'zod';
import type { Prettify } from '../@types/utils';
import { tournamentStatus } from '../const/status.const';

const tournamentSchema = z.object({
  name: z.string().min(3),
  location: z.string().min(5),
  description: z.string().transform((v) => v || undefined),
  status: z.enum(tournamentStatus),
  startDate: z.iso.date(),
  teams: z.array(z.string()).min(2),
});

const tournamentUpdateSchema = tournamentSchema.partial();

type _TournamentType = z.infer<typeof tournamentSchema>;

type TournamentType = Prettify<
  {
    _id: string;
  } & _TournamentType
>;

export type { _TournamentType, TournamentType };

export { tournamentSchema, tournamentUpdateSchema };
