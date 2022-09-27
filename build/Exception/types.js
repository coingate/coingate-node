"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusEnum = exports.ErrorReasonEnum = void 0;
var ErrorReasonEnum;
(function (ErrorReasonEnum) {
    ErrorReasonEnum["BAD_AUTH_TOKEN"] = "BadAuthToken";
    ErrorReasonEnum["ORDER_NOT_FOUND"] = "OrderNotFound";
    ErrorReasonEnum["ORDER_IS_NOT_VALID"] = "OrderIsNotValid";
    ErrorReasonEnum["REFUND_IS_NOT_VALID"] = "RefundIsNotValid";
})(ErrorReasonEnum = exports.ErrorReasonEnum || (exports.ErrorReasonEnum = {}));
var HttpStatusEnum;
(function (HttpStatusEnum) {
    HttpStatusEnum[HttpStatusEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusEnum[HttpStatusEnum["NOT_AUTHORIZED"] = 401] = "NOT_AUTHORIZED";
    HttpStatusEnum[HttpStatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusEnum[HttpStatusEnum["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusEnum[HttpStatusEnum["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatusEnum[HttpStatusEnum["ITERNAL_SERVER_ERROR"] = 500] = "ITERNAL_SERVER_ERROR";
    HttpStatusEnum[HttpStatusEnum["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(HttpStatusEnum = exports.HttpStatusEnum || (exports.HttpStatusEnum = {}));
