import z from 'zod';

const commentSchema = z.object({
  id: z.string(),
  teamId: z.string(),
  timestamp: z.string(),
  type: z.string(),
  text: z.string().optional(),
  playerId: z.string().optional(),
});

type CommentType = z.infer<typeof commentSchema>;

export type { CommentType };

export { commentSchema };
