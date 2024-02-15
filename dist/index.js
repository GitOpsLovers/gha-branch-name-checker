"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const actions_toolkit_1 = require("actions-toolkit");
const validate_parameters_use_case_1 = __importDefault(require("./application/validate-parameters.use-case"));
const write_comment_use_case_1 = __importDefault(require("./application/write-comment.use-case"));
const parameters_schema_1 = __importDefault(require("./domain/parameters.schema"));
actions_toolkit_1.Toolkit.run(async (tools) => {
    tools.log.info('Validating parameters...');
    (0, validate_parameters_use_case_1.default)(tools, parameters_schema_1.default);
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
            await (0, write_comment_use_case_1.default)(tools, commentForInvalidBranchName);
            if (failIfInvalidBranchName === 'true') {
                tools.exit.failure();
            }
        }
    }
    catch (error) {
        tools.log.info('Unexpected error happened when action was running: ', error);
    }
}, {
    event: ['pull_request'],
    secrets: ['GITHUB_TOKEN'],
});
