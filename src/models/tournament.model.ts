import { model, Schema, Types } from 'mongoose';
import type { TournamentStatusType } from '../constants/status.const';
import type { TeamType } from '../schemas/team.schema';
import type { TournamentType } from '../schemas/tournament.schema';

type _TournamentType = TournamentType & {
  teams: TeamType[];
};

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
