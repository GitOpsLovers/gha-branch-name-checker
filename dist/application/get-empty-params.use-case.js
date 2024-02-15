"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get parameters with empty values
 *
 * @param tools Action's toolkit
 * @param schema Parameters schema
 *
 * @returns Parameters with empty values
 */
function getParametersWithEmptyValues(tools, schema) {
    return Object.entries(schema).reduce((acc, [parameter, parameterConfig]) => {
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
exports.default = getParametersWithEmptyValues;
