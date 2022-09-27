import { PublicService } from '../src/Modules';
import { CurrencyKindEnum } from '../src/Modules/Public/types';
import {
  mockConfig,
  mockExchangeRateData,
  mockGetCurrenciesData,
  mockSeparator
} from './Mocks';

describe('Public client', () => {
  let publicService;
  let getSpy;

  beforeEach(() => {
    publicService = new PublicService();
    getSpy = jest.spyOn(publicService, 'get');
  });

  describe('getExchangeRate method', () => {
    test('should build path and call get method', () => {
      const buildPathSpy = jest.spyOn(publicService, 'buildPath');

      const result = publicService.getExchangeRate(mockExchangeRateData);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/rates/merchant/:from/:to',
        params: mockExchangeRateData
      });
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: `/v2/rates/merchant/${mockExchangeRateData.from}/${mockExchangeRateData.to}`
      });
    });
  });

  describe('listExchangeRates method', () => {
    test('should call get with path /v2/rates/', () => {
      const result = publicService.listExchangeRates();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: '/v2/rates/' });
    });
  });

  describe('ping method', () => {
    test('should call get with path /v2/ping/', () => {
      const result = publicService.ping();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: '/v2/ping/' });
    });
  });

  describe('ipAddresses method', () => {
    test('should call get with path /v2/ips-v4/ and pass separator param', () => {
      const result = publicService.ipAddresses(mockSeparator);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/ips-v4/',
        params: { separator: mockSeparator }
      });
    });

    test('should call get with path /v2/ips-v4/ and pass undefined separator param when it is not provided', () => {
      const result = publicService.ipAddresses();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/ips-v4/',
        params: { separator: undefined }
      });
    });
  });

  describe('getCurrencies methods', () => {
    test('should call get with path /v2/currencies/ and provided params', () => {
      const result = publicService.getCurrencies(mockGetCurrenciesData);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/currencies/',
        params: mockGetCurrenciesData
      });
    });

    test('should call get with path /v2/currencies/ and undefined params when it is not provided', () => {
      const result = publicService.getCurrencies();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/currencies/',
        params: undefined
      });
    });
  });

  describe('getCheckoutCurrencies method', () => {
    test('should call getCurrencies method with params for checkout currencies', () => {
      const getCurrenciesSpy = jest.spyOn(publicService, 'getCurrencies');

      const result = publicService.getCheckoutCurrencies();

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: CurrencyKindEnum.CRYPTO,
        native: true,
        merchant_pay: true
      });
    });
  });

  describe('getMerchantPayCurrencies method', () => {
    test('should call getCurrencies method with params for merchant pay currencies and selected currency kind', () => {
      const getCurrenciesSpy = jest.spyOn(publicService, 'getCurrencies');

      const result = publicService.getMerchantPayCurrencies(
        CurrencyKindEnum.FIAT
      );

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: CurrencyKindEnum.FIAT,
        native: false,
        merchant_pay: true
      });
    });

    test('should call getCurrencies method with params for merchant pay currencies', () => {
      const getCurrenciesSpy = jest.spyOn(publicService, 'getCurrencies');

      const result = publicService.getMerchantPayCurrencies();

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: undefined,
        native: false,
        merchant_pay: true
      });
    });
  });

  describe('getMerchantPayoutCurrencies method', () => {
    test('should call getCurrencies method with params for checkout currencies and selected currency kind', () => {
      const getCurrenciesSpy = jest.spyOn(publicService, 'getCurrencies');

      const result = publicService.getMerchantPayoutCurrencies(
        CurrencyKindEnum.CRYPTO
      );

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: CurrencyKindEnum.CRYPTO,
        native: false,
        merchant_pay: false,
        merchant_receive: true
      });
    });

    test('should call getCurrencies method with params for checkout currencies', () => {
      const getCurrenciesSpy = jest.spyOn(publicService, 'getCurrencies');

      const result = publicService.getMerchantPayoutCurrencies();

      expect(result).toBeDefined();
      expect(getCurrenciesSpy).toBeCalledTimes(1);
      expect(getCurrenciesSpy).toBeCalledWith({
        kind: undefined,
        native: false,
        merchant_pay: false,
        merchant_receive: true
      });
    });
  });

  describe('getPlatforms method', () => {
    test('should call get with path /v2/currencies/ and provided params', () => {
      const result = publicService.getPlatforms(true);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/currencies/',
        params: { enabled: 'true' }
      });
    });
  });

  describe('test method', () => {
    test('should call get with path /v2/auth/test and provided apiKey', () => {
      const result = publicService.test(mockConfig.apiKey);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/auth/test',
        apiKey: mockConfig.apiKey
      });
    });
  });
});
