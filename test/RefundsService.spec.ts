import { RefundsService } from '../src/Modules';
import { mockOrderRefundData, mockRefundsData } from './Mocks';

describe('refundsService', () => {
  let refundsService;
  let getSpy;
  let postSpy;

  beforeEach(() => {
    refundsService = new RefundsService();
    getSpy = jest.spyOn(refundsService, 'get');
    postSpy = jest.spyOn(refundsService, 'post');
  });

  describe('createOrderRefund method', () => {
    test('should build path and call post with it', () => {
      const { order_id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsService, 'buildPath');
      const result = refundsService.createOrderRefund(
        order_id,
        mockOrderRefundData
      );

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:order_id/refunds',
        params: { order_id }
      });
      expect(postSpy).toBeCalledTimes(1);
      expect(postSpy).toBeCalledWith(
        `/v2/orders/${order_id}/refunds`,
        mockOrderRefundData
      );
    });
  });

  describe('getOrderRefund method', () => {
    test('should build path and call get method with it', () => {
      const { order_id, id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsService, 'buildPath');
      const result = refundsService.getOrderRefund(order_id, id);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:order_id/refunds/:id',
        params: { order_id, id }
      });
    });
  });

  describe('getOrderRefunds method', () => {
    test('should build path and call get method', () => {
      const { order_id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsService, 'buildPath');
      const result = refundsService.getOrderRefunds(order_id);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:order_id/refunds',
        params: { order_id }
      });
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: `/v2/orders/${order_id}/refunds` });
    });
  });

  describe('getRefunds method', () => {
    test('should call get method with path /v2/refunds', () => {
      const result = refundsService.getRefunds();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: '/v2/refunds' });
    });
  });
});
