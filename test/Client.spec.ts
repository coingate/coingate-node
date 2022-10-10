import { Client } from '../src/Client';

import { mockConfig, mockWrongApiKeys, mockWrongEnvironment } from './Mocks';

describe('Client', () => {
  let client: Client;
  let validateConfigSpy;

  describe('setApiKey method', () => {
    beforeEach(() => {
      client = new Client(null, true);
      validateConfigSpy = jest
        .spyOn(client, 'validateConfig')
        .mockReturnValue(undefined);
    });

    test('should set api key when its matching criteria', () => {
      const result = client.setApiKey(mockConfig.apiKey);

      expect(result).toBe(undefined);
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith(mockConfig);
    });

    test('should throw an error if apiKey contains whitespaces', () => {
      const result = () => client.setApiKey(mockWrongApiKeys.keyWithWhitespace);

      expect(result).toThrow('apiKey cannot contain whitespace');
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: mockWrongApiKeys.keyWithWhitespace
      });
    });

    test('should throw an error if apiKey is an empty string', () => {
      const result = () => client.setApiKey(mockWrongApiKeys.keyEmpty);

      expect(result).toThrow('apiKey cannot be empty string');

      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: mockWrongApiKeys.keyEmpty
      });
    });
  });

  describe('setEnvironment method', () => {
    beforeEach(() => {
      client = new Client(null, true);
      validateConfigSpy = jest.spyOn(client, 'validateConfig');
    });

    test('should set new environment if everything is ok', () => {
      const setBaseUrlByEnvSpy = jest
        .spyOn(client, 'setBaseUrlByEnv')
        .mockReturnValue(undefined);

      const result = client.setEnvironment(mockConfig.environment);

      expect(result).toBe(undefined);
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: null
      });
      expect(setBaseUrlByEnvSpy).toHaveBeenCalledTimes(1);
      expect(setBaseUrlByEnvSpy).toHaveBeenCalledWith(mockConfig.environment);
    });

    test('should throw error if environment is not: live, sandbox', () => {
      const result = () => client.setEnvironment(mockWrongEnvironment);

      expect(result).toThrow(
        'Environment does not exist. Available environments: live, sandbox'
      );
      expect(validateConfigSpy).toHaveBeenCalledTimes(1);
      expect(validateConfigSpy).toHaveBeenCalledWith({
        ...mockConfig,
        apiKey: null,
        environment: mockWrongEnvironment
      });
    });
  });

  describe('getApiKey method', () => {
    beforeAll(() => {
      client = new Client(mockConfig.apiKey);
    });

    test('should return apiKey', () => {
      const result = client.getApiKey();

      expect(result).toBe(mockConfig.apiKey);
    });
  });

  describe('getEnvironment method', () => {
    beforeAll(() => {
      client = new Client(null, true);
    });

    test('should return current environment', () => {
      const result = client.getEnvironment();

      expect(result).toBe(mockConfig.environment);
    });
  });
});
