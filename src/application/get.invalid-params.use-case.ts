import { Toolkit } from 'actions-toolkit';
import { ParametersSchema } from '../domain/parameters.models';

/**
 * Get parameters with invalid values
 *
 * @param tools Action's toolkit
 * @param schema Parameters schema
 *
 * @returns Parameters with invalid values
 */
export default function getParametersWithInvalidValues(
  tools: Toolkit,
  schema: ParametersSchema,
): string[] {
  return Object.entries(schema).reduce<string[]>((acc, [parameter, parameterConfig]) => {
    if (!parameterConfig.availableValues) {
      return acc;
    }

    if (!parameterConfig.required && !tools.inputs[parameter]) {
      return acc;
    }

    if (!parameterConfig.availableValues.includes(tools.inputs[parameter])) {
      acc.push(parameter);
    }

    return acc;
  }, []);
}
