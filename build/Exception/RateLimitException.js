"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitException = void 0;
const ApiErrorException_1 = require("./ApiErrorException");
class RateLimitException extends ApiErrorException_1.ApiErrorException {
}
exports.RateLimitException = RateLimitException;
