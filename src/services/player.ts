import { Player } from '../models/player.model';
import type { PlayerType } from '../schemas/player.schema';

const getAllPlayers = (): Promise<PlayerType[]> => Player.find();

const createPlayer = (match: PlayerType): Promise<PlayerType | null> =>
  Player.create(match);

export { createPlayer, getAllPlayers };
