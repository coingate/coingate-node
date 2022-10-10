"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const ApiErrorException_1 = require("./ApiErrorException");
class InternalServerError extends ApiErrorException_1.ApiErrorException {
}
exports.InternalServerError = InternalServerError;
