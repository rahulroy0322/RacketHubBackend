import z from 'zod';
import type { Prettify } from '../@types/utils';
import { matchStatus } from '../const/status.const';
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
  maxPoints: z.number().default(0),
  description: z.string().transform((v) => v || undefined),
  name: z.string().transform((v) => v || undefined),
  comments: z.array(commentSchema).default([]),
});

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

const matchStartSchema = z.object({
  maxPoints: z.number().min(3),
  data: commentSchema,
});

type _MatchType = z.infer<typeof matchSchema>;

type MatchType = Prettify<
  {
    _id: string;
  } & _MatchType
>;

export type { _MatchType, MatchType };

export { matchSchema, matchUpdateSchema, matchStartSchema };
