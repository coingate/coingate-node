import { AxiosResponse } from 'axios';
export declare class ApiErrorException extends Error {
    protected reason: string | null;
    protected errors: string[];
    protected httpStatus: number | null;
    static factory(response: AxiosResponse, status: number): ApiErrorException;
    getReason(): string | null;
    getErrorDetails(): string[];
    getHttpStatus(): number | null;
    setReason(reason: string | null): string | null;
    setHttpStatus(status: number | null): number | null;
    setErrorDetails(errors: string[]): string[];
}
