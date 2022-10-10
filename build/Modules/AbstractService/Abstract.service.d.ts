import { BuildPathInput } from './types';
/**
 * Class representing Abstract service
 */
export declare class AbstractService {
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
}
