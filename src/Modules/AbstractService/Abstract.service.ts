import { InvalidArgumentException } from '#Exception';
import { PaginationParams } from '#Modules/types';

import { BuildPathInput } from './types';

/**
 * Class representing Abstract service
 */
export class AbstractService {
  protected defaultPaginationParams = { page: 1, per_page: 100 };

  /**
   * Builds path with provided params
   * @param {BuildPathInput} param
   * @returns {string} path
   */
  protected buildPath({ path, params }: BuildPathInput) {
    let newPath = path;
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        newPath = newPath.replace(`:${key}`, value as string);
      }
    }

    return newPath;
  }

  /**
   * Api key validator
   * @param {string|null} apiKey
   */
  protected validateApiKey(apiKey: string | null) {
    if (apiKey !== null) {
      if (typeof apiKey !== 'string') {
        throw new InvalidArgumentException('apiKey must be null or a string');
      }

      if (apiKey.length === 0) {
        throw new InvalidArgumentException('apiKey cannot be empty string');
      }

      if (/\s/.test(apiKey)) {
        throw new InvalidArgumentException('apiKey cannot contain whitespace');
      }
    }
  }

  /**
   * Checks if params exists, if no then sets default params and formats it
   * @param {PaginationParams} params
   */
  protected formatPaginationParams(params?: PaginationParams) {
    const searchParams = params || this.defaultPaginationParams;

    const formattedParams = new URLSearchParams();

    formattedParams.append('page', searchParams.page.toString());
    formattedParams.append('per_page', searchParams.per_page.toString());

    return formattedParams;
  }
}
