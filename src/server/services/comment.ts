import type { MatchStatusType } from '../../const/status.const';
import { Match } from '../../models/match.model';
import type { CommentType } from '../../schemas/comment.schema';
import type { MatchType } from '../../schemas/match.schema';

const getAllComments = (matchId: string): Promise<MatchType | null> =>
  Match.findById(matchId, '+comments').populate(
    'comments.playerId'
  ) as unknown as Promise<MatchType>;

const createComment = async (
  matchId: string,
  data: CommentType & {
    status?: MatchStatusType;
  }
): Promise<MatchType | null> => {
  const match = await Match.findById(matchId);

  if (!match) {
    return null;
  }

  const { scoreA, scoreB, status, ..._data } = data;

  return await Match.findByIdAndUpdate(
    matchId,
    {
      $push: {
        comments: _data,
      },
      ...(status ? { status } : {}),
      scoreA,
      scoreB,
    },
    {
      projection: '+comments',
    }
  );
};

export { getAllComments, createComment };
