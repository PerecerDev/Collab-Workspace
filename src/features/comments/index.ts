export { CommentThread } from './components/CommentThread';
export {
  useCommentsQuery,
  useCreateCommentMutation,
  commentKeys,
} from './hooks/useCommentsQuery';
export { useCommentSync } from './hooks/useCommentSync';
export { commentService } from './services/commentService';
export type {
  Comment,
  CommentTargetType,
  CreateCommentInput,
} from './types/comment.types';
