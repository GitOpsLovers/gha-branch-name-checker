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
  return Object.entries(schema).reduce<string[]>((acc, [parameter, parameterConfig]) => {
    if (!parameterConfig.required) {
      return acc;
    }

    if (tools.inputs[parameter]) {
      return acc;
    }

    acc.push(parameter);
    return acc;
  }, []);
}
