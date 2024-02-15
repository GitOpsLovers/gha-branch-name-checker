"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Write comment use case
 *
 * @param tools Action's toolkit
 * @param comment Comment to be written
 */
async function writeComment(tools, comment) {
    await tools.github.issues.createComment({
        ...tools.context.repo,
        issue_number: tools.context.issue.issue_number,
        body: comment,
    });
}
exports.default = writeComment;
