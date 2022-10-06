"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorResponse = void 0;
const Api_1 = require("./Api");
const InternalServerError_1 = require("./InternalServerError");
const RateLimitException_1 = require("./RateLimitException");
const UnknownApiErrorException_1 = require("./UnknownApiErrorException");
const types_1 = require("./types");
const RequestTimeoutException_1 = require("./RequestTimeoutException");
const handleErrorResponse = (error) => {
    if (error.code === 'ECONNABORTED') {
        throw new RequestTimeoutException_1.RequestTimeoutException('Request timed out.');
    }
    const { response } = error;
    if (response) {
        const { status, data: { reason } } = response;
        switch (status) {
            case types_1.HttpStatusEnum.BAD_REQUEST:
                throw Api_1.BadRequest.factory(response, status);
            case types_1.HttpStatusEnum.NOT_AUTHORIZED:
                switch (reason) {
                    case types_1.ErrorReasonEnum.BAD_AUTH_TOKEN:
                        throw Api_1.BadAuthToken.factory(response, status);
                    default:
                        throw Api_1.Unauthorized.factory(response, status);
                }
            case types_1.HttpStatusEnum.NOT_FOUND:
                switch (reason) {
                    case types_1.ErrorReasonEnum.ORDER_NOT_FOUND:
                        throw Api_1.OrderNotFound.factory(response, status);
                    default:
                        throw Api_1.NotFound.factory(response, status);
                }
            case types_1.HttpStatusEnum.UNPROCESSABLE_ENTITY:
                switch (reason) {
                    case types_1.ErrorReasonEnum.ORDER_NOT_FOUND:
                        throw Api_1.OrderNotFound.factory(response, status);
                    case types_1.ErrorReasonEnum.ORDER_IS_NOT_VALID:
                        throw Api_1.OrderIsNotValid.factory(response, status);
                    case types_1.ErrorReasonEnum.REFUND_IS_NOT_VALID:
                        throw Api_1.RefundIsNotValid.factory(response, status);
                    default:
                        throw Api_1.UnprocessableEntity.factory(response, status);
                }
            case types_1.HttpStatusEnum.TOO_MANY_REQUESTS:
                throw RateLimitException_1.RateLimitException.factory(response, status);
            case types_1.HttpStatusEnum.INTERNAL_SERVER_ERROR | types_1.HttpStatusEnum.GATEWAY_TIMEOUT:
                throw InternalServerError_1.InternalServerError.factory(response, status);
            default:
                throw UnknownApiErrorException_1.UnknownApiErrorException.factory(response, status);
        }
    }
};
exports.handleErrorResponse = handleErrorResponse;
