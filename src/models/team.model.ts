import { model, Schema, Types } from 'mongoose';
import type { _TeamType } from '../schemas/team.schema';

const TeamSchema = new Schema<_TeamType>(
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

const Team = model<_TeamType>('team', TeamSchema);

export { Team };
