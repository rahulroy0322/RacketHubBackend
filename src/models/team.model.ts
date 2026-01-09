import { model, Schema, Types } from 'mongoose';
import type { TeamType } from '../schemas/team.schema';

const TeamSchema = new Schema<TeamType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
    },

    players: {
      type: [Types.ObjectId],
      ref: 'player',
    },
  },
  {
    timestamps: true,
  }
);

const Team = model<TeamType>('team', TeamSchema);

export { Team };
