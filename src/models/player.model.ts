import { model, Schema } from 'mongoose';
import type { _PlayerType } from '../schemas/player.schema';

const PlayerSchema = new Schema<_PlayerType>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Player = model<_PlayerType>('player', PlayerSchema);

export { Player };
