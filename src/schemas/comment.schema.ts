import z from 'zod';

const commentSchema = z.object({
	id: z.string().min(1, 'Id is required'),
teamId: z.string().transform(v=>v||undefined),
	timestamp: z.string().min(1, 'timestamp is required'),
	type: z.string().min(1, 'Type is required'),
	text: z.string().transform((v) => v || undefined),
	playerId: z.string().transform((v) => v || undefined),
})


type CommentType = z.infer<typeof commentSchema>;

export type { CommentType };

export { commentSchema };
