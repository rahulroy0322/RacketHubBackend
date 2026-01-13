import z from 'zod';

const teamSchema = z.object({
  name: z.string().min(3),
  players: z.array(z.string()).min(2),
  location: z.string().transform((v) => v || undefined),
});

type TeamType = z.infer<typeof teamSchema>;

export type { TeamType };

export { teamSchema };
