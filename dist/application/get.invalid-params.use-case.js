"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get parameters with invalid values
 *
 * @param tools Action's toolkit
 * @param schema Parameters schema
 *
 * @returns Parameters with invalid values
 */
function getParametersWithInvalidValues(tools, schema) {
    return Object.entries(schema).reduce((acc, [parameter, parameterConfig]) => {
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
exports.default = getParametersWithInvalidValues;
