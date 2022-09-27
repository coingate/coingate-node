"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorException = void 0;
class ApiErrorException extends Error {
    constructor() {
        super(...arguments);
        this.reason = null;
        this.errors = [];
        this.httpStatus = null;
    }
    static factory(response, status) {
        const { data: { reason, errors, message } } = response;
        const error = new this(message || null);
        error.setReason(reason);
        error.setErrorDetails(errors);
        error.setHttpStatus(status);
        return error;
    }
    getReason() {
        return this.reason;
    }
    getErrorDetails() {
        return this.errors;
    }
    getHttpStatus() {
        return this.httpStatus;
    }
    setReason(reason) {
        this.reason = reason;
        return this.reason;
    }
    setHttpStatus(status) {
        this.httpStatus = status;
        return this.httpStatus;
    }
    setErrorDetails(errors) {
        this.errors = errors;
        return this.errors;
    }
}
exports.ApiErrorException = ApiErrorException;
