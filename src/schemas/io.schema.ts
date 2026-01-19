import { z } from 'zod';

const eventSchema = z.object({
  type: z.enum([
    'p:fair',
    'p:out',
    'ir:net',
    'ir:touch',
    'ir:double',
    'ir:over-net',
    'ir:under-net',
    's:hight',
    's:foot-line',
    's:foot-ground',
    's:contact',
    's:court',
    's:flick',
    'compleate',
  ]),
  data: z.any().optional(),
});

const roomJoinSchema = z.object({
  type: z.enum(['join:room']),
  data: z.string(),
});

type EventType = z.infer<typeof eventSchema>;

export type { EventType };

export { eventSchema, roomJoinSchema };
