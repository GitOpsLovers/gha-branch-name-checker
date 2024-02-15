import { Toolkit } from 'actions-toolkit';
import validateParameters from './application/validate-parameters.use-case';
import writeComment from './application/write-comment.use-case';
import parametersSchema from './domain/parameters.schema';

Toolkit.run(
  async (tools: Toolkit) => {
    tools.log.info('Validating parameters...');

    validateParameters(tools, parametersSchema);

    try {
      tools.log.info('Running the action...');

      const branchPattern = tools.inputs.branch_pattern;
      const failIfInvalidBranchName = tools.inputs.fail_if_invalid_branch_name;
      const ignoreBranchPattern = tools.inputs.ignore_branch_pattern;
      const commentForInvalidBranchName = tools.inputs.comment_for_invalid_branch_name || 'The name of this branch is not \n following the standards of this project!';
      const branchName = tools.context?.payload?.pull_request?.head.ref;

      if (branchPattern) {
        const isValidBranchName = new RegExp(branchPattern).test(branchName);

        if (ignoreBranchPattern) {
          const isIgnoredBranch = new RegExp(ignoreBranchPattern).test(branchName);

          if (isIgnoredBranch) {
            tools.log.info('This branch should be ignored');

            return;
          }
        }

        if (isValidBranchName) {
          tools.log.info('This branch has a valid name');

          return;
        }

        tools.log.info('This branch has an invalid name');

        await writeComment(tools, commentForInvalidBranchName);

        if (failIfInvalidBranchName === 'true') {
          tools.exit.failure();
        }
      }
    } catch (error) {
      tools.log.info('Unexpected error happened when action was running: ', error);
    }
  },
  {
    event: ['pull_request'],
    secrets: ['GITHUB_TOKEN'],
  },
);
