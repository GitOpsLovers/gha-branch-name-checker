import { Toolkit } from 'actions-toolkit';
import { ParametersSchema } from '../domain/parameters.models';

/**
 * Get parameters with empty values
 *
 * @param tools Action's toolkit
 * @param schema Parameters schema
 *
 * @returns Parameters with empty values
 */
export default function getParametersWithEmptyValues(
  tools: Toolkit,
  schema: ParametersSchema,
): string[] {
  return Object.entries(schema)
    .filter(([parameter, parameterConfig]) => parameterConfig.required && !Object.prototype.hasOwnProperty.call(tools.inputs, parameter))
    .map(([parameter]) => parameter);
}
