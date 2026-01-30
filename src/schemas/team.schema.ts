import z from 'zod';
import type { Prettify } from '../@types/utils';

const teamSchema = z.object({
  name: z.string().min(3),
  players: z.array(z.string()).min(2),
  location: z.string().transform((v) => v || undefined),
});

type _TeamType = z.infer<typeof teamSchema>;

type TeamType = Prettify<
  {
    _id: string;
  } & _TeamType
>;

export type { _TeamType, TeamType };

export { teamSchema };
