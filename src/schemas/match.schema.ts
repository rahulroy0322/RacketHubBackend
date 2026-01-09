import z from 'zod';
import { matchStatus } from '../constants/status.const';
import { commentSchema } from './comment.schema';

const matchSchema = z.object({
  tournamentId: z.string(),
  teamAId: z.string(),
  teamBId: z.string(),
  scoreA: z.number().default(0),
  scoreB: z.number().default(0),
  time: z.string(),
  status: z.enum(matchStatus),
  location: z.string().min(5).optional(),
  description: z.string().optional(),
  name: z.string().min(3).optional(),
  comments: z.array(commentSchema).default([]),
});

type MatchType = z.infer<typeof matchSchema>;

export type { MatchType };

export { matchSchema };
