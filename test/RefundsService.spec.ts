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
      const { order_id: orderId } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsService, 'buildPath');
      const result = refundsService.createOrderRefund(
        orderId,
        mockOrderRefundData
      );

      expect(result).toBeDefined();
      expect(buildPathSpy).toHaveBeenCalledTimes(1);
      expect(buildPathSpy).toHaveBeenCalledWith({
        path: '/v2/orders/:order_id/refunds',
        params: { order_id: orderId }
      });
      expect(postSpy).toHaveBeenCalledTimes(1);
      expect(postSpy).toHaveBeenCalledWith(
        `/v2/orders/${orderId}/refunds`,
        mockOrderRefundData
      );
    });
  });

  describe('getOrderRefund method', () => {
    test('should build path and call get method with it', () => {
      const { order_id: orderId, id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsService, 'buildPath');
      const result = refundsService.getOrderRefund(orderId, id);

      expect(result).toBeDefined();
      expect(buildPathSpy).toHaveBeenCalledTimes(1);
      expect(buildPathSpy).toHaveBeenCalledWith({
        path: '/v2/orders/:order_id/refunds/:id',
        params: { id, order_id: orderId }
      });
    });
  });

  describe('getOrderRefunds method', () => {
    test('should build path and call get method', () => {
      const { order_id: orderId } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsService, 'buildPath');
      const result = refundsService.getOrderRefunds(orderId);

      expect(result).toBeDefined();
      expect(buildPathSpy).toHaveBeenCalledTimes(1);
      expect(buildPathSpy).toHaveBeenCalledWith({
        path: '/v2/orders/:order_id/refunds',
        params: { order_id: orderId }
      });
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith({
        path: `/v2/orders/${orderId}/refunds`
      });
    });
  });

  describe('getRefunds method', () => {
    test('should call get method with path /v2/refunds', () => {
      const result = refundsService.getRefunds();

      expect(result).toBeDefined();
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(getSpy).toHaveBeenCalledWith({ path: '/v2/refunds' });
    });
  });
});
