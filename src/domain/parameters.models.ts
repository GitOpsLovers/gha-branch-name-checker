/**
 * Parameters schema model for the action
 */
export interface ParametersSchema {
  branch_pattern: {
    required: boolean;
  };
  fail_if_invalid_branch_name?: {
    required?: boolean;
    availableValues?: string[];
  };
  comment_for_invalid_branch_name?: {
    required?: boolean;
  };
  ignore_branch_pattern?: {
    required?: boolean;
  };
}
