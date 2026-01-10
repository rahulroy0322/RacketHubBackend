import z from 'zod';

const playerSchema = z.object({
  name: z.string().min(3),
  location: z.string().min(3).optional(),
});

type PlayerType = z.infer<typeof playerSchema>;

export type { PlayerType };

export { playerSchema };
