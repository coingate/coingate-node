import { AxiosResponse } from 'axios';

export class ApiErrorException extends Error {
  protected reason: string | null = null;

  protected errors: string[] = [];

  protected httpStatus: number | null = null;

  public static factory(response: AxiosResponse, status: number) {
    const {
      data: { reason, errors, message }
    } = response;

    const error = new this(message || null);

    error.setReason(reason);
    error.setErrorDetails(errors);
    error.setHttpStatus(status);

    return error;
  }

  public getReason(): string | null {
    return this.reason;
  }

  public getErrorDetails(): string[] {
    return this.errors;
  }

  public getHttpStatus(): number | null {
    return this.httpStatus;
  }

  public setReason(reason: string | null): string | null {
    this.reason = reason;

    return this.reason;
  }

  public setHttpStatus(status: number | null): number | null {
    this.httpStatus = status;

    return this.httpStatus;
  }

  public setErrorDetails(errors: string[]): string[] {
    this.errors = errors;

    return this.errors;
  }
}
