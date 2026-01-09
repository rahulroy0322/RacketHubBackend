import { model, Schema } from 'mongoose';
import type { PlayerType } from '../schemas/player.schema';

const PlayerSchema = new Schema<PlayerType>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = model<PlayerType>('player', PlayerSchema);

export { Player };
