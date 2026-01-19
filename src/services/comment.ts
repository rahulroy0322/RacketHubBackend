import { Match } from '../models/match.model';
import type { CommentType } from '../schemas/comment.schema';
import type { MatchType } from '../schemas/match.schema';

const getAllComments = (matchId: string): Promise<MatchType | null> =>
  Match.findById(matchId, '+comments').populate('comments.playerId');

const createComment = async (
  matchId: string,
  data: CommentType
): Promise<MatchType | null> => {
  const match = await Match.findById(matchId);

  if (!match) {
    return null;
  }

  const { scoreA, scoreB, ..._data } = data;

  return await Match.findByIdAndUpdate(
    matchId,
    {
      $push: {
        comments: _data,
      },
      scoreA,
      scoreB,
    },
    {
      projection: '+comments',
    }
  );
};

export { getAllComments, createComment };
