import z from 'zod';
import type { Prettify } from '../@types/utils';

const playerSchema = z.object({
  name: z.string().min(3),
  location: z.string().transform((val) => val || undefined),
});

type _PlayerType = z.infer<typeof playerSchema>;

type PlayerType = Prettify<
  {
    _id: string;
  } & _PlayerType
>;

export type { _PlayerType, PlayerType };

export { playerSchema };
