import type { RequestHandler } from 'express';
import type { ResType } from '../@types/res';
import { commentSchema } from '../schemas/comment.schema';
import { createComment, getAllComments } from '../services/comment';

const getAllCommentsByMatchIdController: RequestHandler<{
  matchId: string;
}> = async (req, res) => {
  const comments = await getAllComments(req.params.matchId);

  res.status(200).json({
    success: true,
    data: { comments },
  } satisfies ResType);
};

// Todo! move to admin?
const createCommentByMatchIdController: RequestHandler<{
  matchId: string;
}> = async (req, res) => {
  const valid = commentSchema.safeParse(req.body);

  if (!valid.success) {
    throw valid.error;
  }

  const comment = await createComment(req.params.matchId, valid.data);

  res.status(200).json({
    success: true,
    data: { comment },
  } satisfies ResType);
};

export { getAllCommentsByMatchIdController, createCommentByMatchIdController };
