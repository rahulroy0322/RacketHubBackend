import { Player } from '../../models/player.model';
import type { _PlayerType, PlayerType } from '../../schemas/player.schema';

const getAllPlayers = (): Promise<PlayerType[]> => Player.find();

const createPlayer = (match: _PlayerType): Promise<PlayerType | null> =>
  //@ts-expect-error
  Player.create(match);

export { createPlayer, getAllPlayers };
