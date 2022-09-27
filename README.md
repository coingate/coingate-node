# coingate-sdk

[![npm package][npm-img]][npm-url]

## Install

```bash
npm install coingate-sdk
```

## Getting Started

You can sign up for a CoinGate account at https://coingate.com for production and https://sandbox.coingate.com for testing (sandbox).

Please note, that for Sandbox you must generate separate API credentials on https://sandbox.coingate.com. API credentials generated on https://coingate.com will not work for Sandbox mode.

Usage of CoinGate package looks like:

```ts
const client = new Client('YOUR_API_TOKEN');
```

In order, to use sandbox mode, you need to set second parameter to `true`.

```ts
const client = new Client('YOUR_API_TOKEN', true);
```

If you plan to use Public API endpoints only, authentication is not required.

```ts
const client = new Client();

// if needed you can set configuration parameters later
client.setApiKey('YOUR_API_TOKEN');
client.setEnvironment('sandbox');
```

### Order

#### Create order

Create order at CoinGate and redirect shopper to invoice (payment_url).

```ts
const data = {
  order_id: 'YOUR-CUSTOM-ORDER-ID-123', // optional
  price_amount: 89.99,
  price_currency: 'GBP',
  receive_currency: 'USD',
  title: 'My first order', // optional
  description: 'Amazon gift card', // optional
  callback_url: 'https://example.com/payments?token=thiSisExAmPlE1o2k3a4y5', // optional
  cancel_url: 'https://example.com/cart', // optional
  success_url: 'https://example.com/account/orders', // optional
  token: 'Your custom token', // optional
  purchaser_email: 'example.guy@xmpl.com' // optional
};

try {
  const order = await client.order.createOrder(data);
} catch (error) {
  // Oops... Something went wrong...
  console.error(error);
}
```

#### Checkout

Placing created order with pre-selected payment currency (BTC, LTC, ETH, etc). Display payment_address and pay_amount for shopper or redirect to payment_url. Can be used to white-label invoices.

```ts
const data = {
  pay_currency: 'BTC',
  lightning_network: true, // optional
  purchaser_email: 'example.guy@xmpl.com', // optional
  platform_id: 'Platform Id' // optional
};

try {
  const checkout = await client.order.checkout(1234, data);
} catch (error) {
  // Oops... Something went wrong...
  console.error(error);
}
```

#### Get Order

After creating an order, you will get an ORDER ID. This ID will be used for GET ORDER requests.

```ts
try {
  const order = await client.order.getOrder(1234); // order id
} catch (error) {
  // Oops... Something went wrong...
  console.error(error);
}
```

#### List Orders

Retrieving information of all placed orders.

```ts
const data = {
  per_page: 10,
  page: 2,
  sort: 'created_at_asc',
  from: '2022-06-22',
  to: '2077-06-22'
}; // all parameters are optional

try {
  const orders = await client.order.listOrders(data); // data is optional
} catch (error) {
  // Oops... Something went wrong...
  console.error(error);
}
```

### Refunds

#### Create Order Refund

Creating a refund for an order.

```ts
const data = {
  amount: 50,
  address: '2ExAmPl3dyFiqkMUUksTJ3Qey1s2Q3f4i59',
  address_memo: 'Red house', // optional
  currency_id: 1,
  platform_id: 2,
  reason: 'Iphone refund',
  email: 'example.guy@xmpl.com',
  ledger_account_id: 'ID of the trader balance'
};

const refund = await client.refunds.createOrderRefund(1234, data);
```

#### Get Order Refund

Retrieving a specific refund for an order.

```ts
const refund = await client.refunds.getOrderRefund(1234, 4321);
```

#### Get Order Refunds

Retrieving all refunds for an order.

```ts
const refund = await client.refunds.getOrderRefunds(1234);
```

#### Get Refunds

Retrieving all refunds.

```ts
const refund = await client.refunds.getRefunds();
```

### Public API

#### Get Exchange Rate

Current exchange rate for any two currencies, fiat or crypto. This endpoint is public, authentication is not required.

```ts
const exchangeRate = await client.public.getExchangeRate({
  from: 'GBP',
  to: 'USD'
});
```

#### List Exchange Rates

Current CoinGate exchange rates for Merchants and Traders. This endpoint is public, authentication is not required.

```ts
const exchangeRates = await client.public.listExchangeRates();
```

#### Ping

A health check endpoint for CoinGate API. This endpoint is public, authentication is not required.

```ts
const pong = await client.public.ping();
```

#### IP Addresses

Get IP addresses of CoinGate servers

```ts
const addresses = await client.public.getIPAddresses(); // Possible to provide separator, like: ', '
```

#### Currencies

```ts
const currencies = await client.public.getCurrencies();

const checkoutCurrencies = await client.public.getCheckoutCurrencies();

const merchantPayCurrencies = await client.public.getMerchantPayCurrencies();

const merchantPayoutCurrencies =
  await client.public.getMerchantPayoutCurrencies();
```

#### Platforms

```ts
const platforms = await client.public.getPlatforms();
```

#### Test API Connection

```ts
const result = client.testConnection('YOUR_API_KEY');
```

[npm-img]: https://i.imgur.com/t1myImf.png
[npm-url]: https://github.com/konkurenta
