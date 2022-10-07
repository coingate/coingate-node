import { AxiosError, AxiosResponse } from 'axios';

import {
  BadAuthToken,
  BadRequest,
  NotFound,
  OrderIsNotValid,
  OrderNotFound,
  RefundIsNotValid,
  Unauthorized,
  UnprocessableEntity
} from './Api';
import { InternalServerError } from './InternalServerError';
import { RateLimitException } from './RateLimitException';
import { UnknownApiErrorException } from './UnknownApiErrorException';
import { ErrorReasonEnum, HttpStatusEnum } from './types';
import { RequestTimeoutException } from './RequestTimeoutException';

export const handleErrorResponse = (error: AxiosError) => {
  if (error.code === 'ECONNABORTED') {
    throw new RequestTimeoutException('Request timed out.');
  }

  const { response } = error;

  if (response) {
    const {
      status,
      data: { reason }
    } = response as AxiosResponse;

    switch (status) {
      case HttpStatusEnum.BAD_REQUEST:
        throw BadRequest.factory(response, status);

      case HttpStatusEnum.NOT_AUTHORIZED:
        switch (reason) {
          case ErrorReasonEnum.BAD_AUTH_TOKEN:
            throw BadAuthToken.factory(response, status);
          default:
            throw Unauthorized.factory(response, status);
        }

      case HttpStatusEnum.NOT_FOUND:
        switch (reason) {
          case ErrorReasonEnum.ORDER_NOT_FOUND:
            throw OrderNotFound.factory(response, status);
          default:
            throw NotFound.factory(response, status);
        }

      case HttpStatusEnum.UNPROCESSABLE_ENTITY:
        switch (reason) {
          case ErrorReasonEnum.ORDER_NOT_FOUND:
            throw OrderNotFound.factory(response, status);
          case ErrorReasonEnum.ORDER_IS_NOT_VALID:
            throw OrderIsNotValid.factory(response, status);
          case ErrorReasonEnum.REFUND_IS_NOT_VALID:
            throw RefundIsNotValid.factory(response, status);
          default:
            throw UnprocessableEntity.factory(response, status);
        }

      case HttpStatusEnum.TOO_MANY_REQUESTS:
        throw RateLimitException.factory(response, status);

      case HttpStatusEnum.INTERNAL_SERVER_ERROR:
      case HttpStatusEnum.GATEWAY_TIMEOUT:
        throw InternalServerError.factory(response, status);

      default:
        throw UnknownApiErrorException.factory(response, status);
    }
  }
};
