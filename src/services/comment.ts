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

  const inc = {
    scoreA: 0,
    scoreB: 0,
  };

  if (data.type === 'p:fair') {
    if (data.teamId === match.teamAId.toString()) {
      inc.scoreA = 1;
    } else {
      inc.scoreB = 1;
    }
  } else {
    if (data.teamId !== match.teamAId.toString()) {
      inc.scoreA = 1;
    } else {
      inc.scoreB = 1;
    }
  }

  return await Match.findByIdAndUpdate(
    matchId,
    {
      $push: {
        comments: data,
      },
      $inc: inc,
    },
    {
      projection: '+comments',
    }
  );
};

export { getAllComments, createComment };
