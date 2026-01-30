import { model, Schema, Types } from 'mongoose';
import type { TournamentStatusType } from '../const/status.const';
import type { _TournamentType } from '../schemas/tournament.schema';

const TournamentSchema = new Schema<_TournamentType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'upcoming' satisfies TournamentStatusType,
    },
    teams: {
      type: [Types.ObjectId],
      ref: 'team',
    },
  },
  {
    timestamps: true,
  }
);

const Tournament = model<_TournamentType>('tournament', TournamentSchema);

export { Tournament };
