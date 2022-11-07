import { WithdrawalsService } from '../src/Modules';
import {
  mockFormattedParams,
  mockSearchParams,
  mockWithdrawalId
} from './Mocks';

describe('withdrawals', () => {
  let withdrawals;
  let getSpy;

  beforeEach(() => {
    withdrawals = new WithdrawalsService();
    getSpy = jest.spyOn(withdrawals, 'get');
  });

  describe('getWithdrawal method', () => {
    test('should call get method with provided data', () => {
      const buildPathSpy = jest.spyOn(withdrawals, 'buildPath');

      const result = withdrawals.getWithdrawal(mockWithdrawalId);

      expect(result).toBeDefined();
      expect(buildPathSpy).toHaveBeenCalledTimes(1);
      expect(buildPathSpy).toHaveBeenCalledWith({
        path: '/v2/withdrawals/:id',
        params: { id: mockWithdrawalId }
      });
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith({
        path: `/v2/withdrawals/${mockWithdrawalId}`
      });
    });
  });

  describe('listAccounts method', () => {
    test('should call get method with provided data', () => {
      const formatPaginationParamsSpy = jest.spyOn(
        withdrawals,
        'formatPaginationParams'
      );
      const result = withdrawals.getWithdrawals(mockSearchParams);

      expect(result).toBeDefined();
      expect(formatPaginationParamsSpy).toHaveBeenCalledTimes(1);
      expect(formatPaginationParamsSpy).toHaveBeenCalledWith(mockSearchParams);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith({
        path: `/v2/withdrawals`,
        searchParams: mockFormattedParams
      });
    });
  });
});
