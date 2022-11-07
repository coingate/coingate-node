import { LedgerService } from '../src/Modules';
import { mockAccountId, mockFormattedParams, mockSearchParams } from './Mocks';

describe('ledger', () => {
  let ledger;
  let getSpy;

  beforeEach(() => {
    ledger = new LedgerService();
    getSpy = jest.spyOn(ledger, 'get');
  });

  describe('getAccount method', () => {
    test('should call get method with provided data', () => {
      const buildPathSpy = jest.spyOn(ledger, 'buildPath');

      const result = ledger.getAccount(mockAccountId);

      expect(result).toBeDefined();
      expect(buildPathSpy).toHaveBeenCalledTimes(1);
      expect(buildPathSpy).toHaveBeenCalledWith({
        path: '/v2/ledger/accounts/:id',
        params: { id: mockAccountId }
      });
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith({
        path: `/v2/ledger/accounts/${mockAccountId}`
      });
    });
  });

  describe('listAccounts method', () => {
    test('should call get method with provided data', () => {
      const formatPaginationParamsSpy = jest.spyOn(
        ledger,
        'formatPaginationParams'
      );
      const result = ledger.listAccounts(mockSearchParams);

      expect(result).toBeDefined();
      expect(formatPaginationParamsSpy).toHaveBeenCalledTimes(1);
      expect(formatPaginationParamsSpy).toHaveBeenCalledWith(mockSearchParams);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith({
        path: `/v2/ledger/accounts`,
        searchParams: mockFormattedParams
      });
    });
  });
});
