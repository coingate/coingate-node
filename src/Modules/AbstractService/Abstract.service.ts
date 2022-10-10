import { InvalidArgumentException } from '#Exception';

import { BuildPathInput } from './types';

/**
 * Class representing Abstract service
 */
export class AbstractService {
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
}
