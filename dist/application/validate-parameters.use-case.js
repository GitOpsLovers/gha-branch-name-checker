"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_empty_params_use_case_1 = __importDefault(require("./get-empty-params.use-case"));
const get_invalid_params_use_case_1 = __importDefault(require("./get.invalid-params.use-case"));
/**
 *
 */
function validateParameters(tools, schema) {
    const parametersWithEmptyValues = (0, get_empty_params_use_case_1.default)(tools, schema);
    if (parametersWithEmptyValues.length) {
        tools.exit.failure(`You forgot to provide some required values: [${parametersWithEmptyValues.join(', ')}]`);
    }
    const parametersWithInvalidValues = (0, get_invalid_params_use_case_1.default)(tools, schema);
    if (parametersWithInvalidValues.length) {
        tools.exit.failure(`Some parameters have invalid values: [${parametersWithInvalidValues.join(', ')}]`);
    }
}
exports.default = validateParameters;
