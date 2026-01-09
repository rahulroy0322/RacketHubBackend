import z from 'zod';

const playerSchema = z.object({
  name: z.string().min(3),
});

type PlayerType = z.infer<typeof playerSchema>;

export type { PlayerType };

export { playerSchema };
