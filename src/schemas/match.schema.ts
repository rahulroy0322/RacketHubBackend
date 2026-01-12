import z from 'zod';
import { matchStatus } from '../constants/status.const';
import { commentSchema } from './comment.schema';



const matchSchema = z.object({
	tournamentId: z.string(),
	teamAId: z.string().min(1, 'Team A Id is required'),
	teamBId: z.string().min(1, 'Team A Id is required'),
	scoreA: z.number(),
	scoreB: z.number(),
	time: z.iso.time(),
	status: z.enum(matchStatus),
	location: z
		.string()
		.min(5)
		.transform((v) => v || undefined),
	description: z.string().transform((v) => v || undefined),
	name: z.string().transform((v) => v || undefined),
	comments: z.array(commentSchema).default([]),
})

const matchUpdateSchema = matchSchema
  .pick({
    teamAId: true,
    teamBId: true,
    scoreA: true,
    scoreB: true,
    time: true,
    status: true,
    location: true,
    description: true,
    name: true,
  })
  .partial();

type MatchType = z.infer<typeof matchSchema>;

export type { MatchType };

export { matchSchema, matchUpdateSchema };
