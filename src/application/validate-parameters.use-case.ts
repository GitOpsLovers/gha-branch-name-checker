import { Toolkit } from 'actions-toolkit';
import { ParametersSchema } from '../domain/parameters.models';
import getParametersWithEmptyValues from './get-empty-params.use-case';
import getParametersWithInvalidValues from './get.invalid-params.use-case';

/**
 *
 */
export default function validateParameters(tools: Toolkit, schema: ParametersSchema): void {
  const parametersWithEmptyValues = getParametersWithEmptyValues(tools, schema);

  if (parametersWithEmptyValues.length) {
    tools.exit.failure(`🚨 You forgot to provide some required values: [${parametersWithEmptyValues.join(', ')}]`);
  }

  const parametersWithInvalidValues = getParametersWithInvalidValues(tools, schema);

  if (parametersWithInvalidValues.length) {
    tools.exit.failure(`🚨 Some parameters have invalid values: [${parametersWithInvalidValues.join(', ')}]`);
  }
}
