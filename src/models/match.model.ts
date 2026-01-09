/** biome-ignore-all lint/suspicious/noExplicitAny: schema only */
import { model, Schema, Types } from 'mongoose';
import type { MatchStatusType } from '../constants/status.const';
import type { CommentType } from '../schemas/comment.schema';
import type { MatchType } from '../schemas/match.schema';

const CommentSchema = new Schema<CommentType>(
  {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    teamId: {
      type: Types.ObjectId,
      ref: 'team',
      required: true,
    } as any,
    timestamp: {
      type: String,
      required: true,
    },

    playerId: {
      type: Types.ObjectId,
      ref: 'player',
      required: false,
    } as any,
    text: {
      type: String,
    },
  },
  {
    timestamps: false,
    _id: false,
  }
);

const MatchSchema = new Schema<MatchType>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'scheduled' satisfies MatchStatusType,
    },
    tournamentId: {
      type: Types.ObjectId,
      ref: 'tournament',
      required: true,
    } as any,
    teamAId: {
      type: Types.ObjectId,
      ref: 'team',
      required: true,
    } as any,
    teamBId: {
      type: Types.ObjectId,
      ref: 'team',
      required: true,
    } as any,
    scoreA: {
      type: Number,
      default: 0,
    },
    scoreB: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [CommentSchema],
      default: [],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const Match = model<MatchType>('match', MatchSchema);

export { Match };
