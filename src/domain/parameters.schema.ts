import { ParametersSchema } from './parameters.models';

/**
 * Parameters schema for the action
 */
const parametersSchema: ParametersSchema = {
  branch_pattern: {
    required: true,
  },
  fail_if_invalid_branch_name: {
    required: false,
    availableValues: ['true', 'false'],
  },
  comment_for_invalid_branch_name: {
    required: false,
  },
  ignore_branch_pattern: {
    required: false,
  },
};

export default parametersSchema;
