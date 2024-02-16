import { Toolkit } from 'actions-toolkit';

/**
 * Deletes previous comment, if exists
 *
 * @param tools Action's toolkit
 * @param commentBody Comment's body
 */
export default async function deletePreviousComment(tools: Toolkit, commentBody: string): Promise<void> {
  const { owner, repo } = tools.context.repo;
  const pullRequestNumber = tools.context.payload?.pull_request?.number;

  if (pullRequestNumber) {
    const { data: comments } = await tools.github.issues.listComments({
      owner,
      repo,
      issue_number: pullRequestNumber,
    });

    const previousComment = comments.find((comment) => comment.body === commentBody);

    if (previousComment) {
      await tools.github.issues.deleteComment({
        owner,
        repo,
        comment_id: previousComment.id,
      });
    }
  }
}
