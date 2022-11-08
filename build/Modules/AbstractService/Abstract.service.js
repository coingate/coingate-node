"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const _Exception_1 = require("../../Exception");
/**
 * Class representing Abstract service
 */
class AbstractService {
    constructor() {
        this.defaultPaginationParams = { page: 1, per_page: 100 };
    }
    /**
     * Builds path with provided params
     * @param {BuildPathInput} param
     * @returns {string} path
     */
    buildPath({ path, params }) {
        let newPath = path;
        if (params) {
            for (const [key, value] of Object.entries(params)) {
                newPath = newPath.replace(`:${key}`, value);
            }
        }
        return newPath;
    }
    /**
     * Api key validator
     * @param {string|null} apiKey
     */
    validateApiKey(apiKey) {
        if (apiKey !== null) {
            if (typeof apiKey !== 'string') {
                throw new _Exception_1.InvalidArgumentException('apiKey must be null or a string');
            }
            if (apiKey.length === 0) {
                throw new _Exception_1.InvalidArgumentException('apiKey cannot be empty string');
            }
            if (/\s/.test(apiKey)) {
                throw new _Exception_1.InvalidArgumentException('apiKey cannot contain whitespace');
            }
        }
    }
    /**
     * Checks if params exists, if no then sets default params and formats it
     * @param {PaginationParams} params
     */
    formatPaginationParams(params) {
        const searchParams = params || this.defaultPaginationParams;
        const formattedParams = new URLSearchParams();
        formattedParams.append('page', searchParams.page.toString());
        formattedParams.append('per_page', searchParams.per_page.toString());
        return formattedParams;
    }
}
exports.AbstractService = AbstractService;
