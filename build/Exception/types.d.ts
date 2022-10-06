export declare enum ErrorReasonEnum {
    BAD_AUTH_TOKEN = "BadAuthToken",
    ORDER_NOT_FOUND = "OrderNotFound",
    ORDER_IS_NOT_VALID = "OrderIsNotValid",
    REFUND_IS_NOT_VALID = "RefundIsNotValid"
}
export declare enum HttpStatusEnum {
    BAD_REQUEST = 400,
    NOT_AUTHORIZED = 401,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    GATEWAY_TIMEOUT = 504
}
