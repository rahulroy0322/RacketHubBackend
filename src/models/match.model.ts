/** biome-ignore-all lint/suspicious/noExplicitAny: trust me */

import { model, Schema, Types } from 'mongoose';
import type { MatchStatusType } from '../const/status.const';
import type { CommentType } from '../schemas/comment.schema';
import type { _MatchType } from '../schemas/match.schema';

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
    },
    timestamp: {
      type: String,
      required: true,
    },

    playerId: {
      type: Types.ObjectId,
      ref: 'player',
      required: false,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: false,
    _id: false,
  }
);

const MatchSchema = new Schema<_MatchType>(
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
    maxPoints: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Match = model<_MatchType>('match', MatchSchema);

export { Match };
