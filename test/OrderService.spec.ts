import { OrderService } from '../src/Modules';
import {
  mockCheckoutData,
  mockCreateOrderData,
  mockListOrdersParams,
  mockOrderId
} from './Mocks';

describe('order', () => {
  let order;
  let getSpy;
  let postSpy;

  beforeEach(() => {
    order = new OrderService();
    getSpy = jest.spyOn(order, 'get');
    postSpy = jest.spyOn(order, 'post');
  });

  describe('createOrder method', () => {
    test('should call post method with provided data', () => {
      const result = order.createOrder(mockCreateOrderData);

      expect(result).toBeDefined();
      expect(postSpy).toBeCalledTimes(1);
      expect(postSpy).toBeCalledWith('/v2/orders/', mockCreateOrderData);
    });
  });

  describe('checkout method', () => {
    test('should call post method with provided data', () => {
      const buildPathSpy = jest.spyOn(order, 'buildPath');
      const result = order.checkout(mockOrderId, mockCheckoutData);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:id/checkout',
        params: { id: mockOrderId }
      });
      expect(postSpy).toBeCalledTimes(1);
      expect(postSpy).toBeCalledWith(
        `/v2/orders/${mockOrderId}/checkout`,
        mockCheckoutData
      );
    });
  });

  describe('getOrder method', () => {
    test('should call get method with provided order id', () => {
      const buildPathSpy = jest.spyOn(order, 'buildPath');
      const result = order.getOrder(mockOrderId);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:id/',
        params: { id: mockOrderId }
      });
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: `/v2/orders/${mockOrderId}/` });
    });
  });

  describe('listOrders method', () => {
    test('should call get method with provided query params', () => {
      const result = order.listOrders(mockListOrdersParams);

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({
        path: '/v2/orders/',
        params: mockListOrdersParams
      });
    });
  });
});
