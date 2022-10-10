import { Client } from '../../src';

const apiKey = ''; // Your sandbox api key

const client = new Client(apiKey, true); // When second parameter is true, you'll get to play in sandbox mode

const createOrder = async () => {
  try {
    const { id } = await client.order.createOrder({
      price_amount: 1,
      price_currency: 'USD',
      receive_currency: 'ETH',
      description: '1x Apple iPhone 22 Pro, 2x Balenciaga backpacks'
    });

    return id;
  } catch (e) {
    console.log(e);
  }
};

const checkout = async (orderId: number) => {
  try {
    const checkout = await client.order.checkout(orderId, {
      pay_currency: 'ETH'
    });
  } catch (e) {
    console.log(e);
  }
};

const trackStatus = async (orderId: number) => {
  const interval = setInterval(async () => {
    const { status } = await client.order.getOrder(orderId);

    if (
      ['expired', 'invalid', 'paid', 'canceled', 'refunded'].includes(status)
    ) {
      console.log(`Order ${orderId} status has changed to: ${status}`);
      return clearInterval(interval);
    }

    console.log(`Your order ${orderId} status is ${status}`);
  }, 2000);
};

const init = async () => {
  const orderId = await createOrder();

  await checkout(orderId);
  trackStatus(orderId);
};

init();
