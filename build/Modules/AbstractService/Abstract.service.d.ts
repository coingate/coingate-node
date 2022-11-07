import { PaginationParams } from '../../Modules/types';
import { BuildPathInput } from './types';
/**
 * Class representing Abstract service
 */
export declare class AbstractService {
    protected defaultPaginationParams: {
        page: number;
        per_page: number;
    };
    /**
     * Builds path with provided params
     * @param {BuildPathInput} param
     * @returns {string} path
     */
    protected buildPath({ path, params }: BuildPathInput): string;
    /**
     * Api key validator
     * @param {string|null} apiKey
     */
    protected validateApiKey(apiKey: string | null): void;
    /**
     * Checks if params exists, if no then sets default params and formats it
     * @param {PaginationParams} params
     */
    protected formatPaginationParams(params?: PaginationParams): URLSearchParams;
}
