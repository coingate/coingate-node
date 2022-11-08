# coingate-sdk

[![npm package][npm-img]][npm-url]

## Install

```bash
npm install @coingate/coingate-sdk
```

## Getting Started

You can sign up for a CoinGate account at https://coingate.com for production and https://sandbox.coingate.com for testing (sandbox).

Please note, that for Sandbox you must generate separate API credentials on https://sandbox.coingate.com. API credentials generated on https://coingate.com will not work for Sandbox mode.

Usage of CoinGate package looks like:

Importing:

```ts
import { Client } from '@coingate/coingate-sdk';
```

Or

```ts
const { Client } = require('@coingate/coingate-sdk');
```

In order, to use live mode, provide only api token.

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

(async () => {
  try {
    const order = await client.order.createOrder(data);
  } catch (error) {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.order
  .createOrder(data)
  .then((order) => console.log(order))
  .catch((error) => console.log(error));
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

(async () => {
  try {
    const checkout = await client.order.checkout(1234, data);
  } catch (error) {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.order
  .checkout(data)
  .then((checkout) => console.log(checkout))
  .catch((error) => console.log(error));
```

#### Get Order

After creating an order, you will get an ORDER ID. This ID will be used for GET ORDER requests.

```ts
(async () => {
  try {
    const order = await client.order.getOrder(1234); // order id
  } catch (error) {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.order
  .getOrder(1234)
  .then((order) => console.log(order))
  .catch((error) => console.log(error));
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

(async () => {
  try {
    const orders = await client.order.listOrders(data); // data is optional
  } catch (error) {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.order
  .listOrders(data)
  .then((orders) => console.log(orders))
  .catch((error) => console.log(error));
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

(async () => {
  try {
    const refund = await client.refunds.createOrderRefund(1234, data);
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.refunds
  .createOrderRefund(1234, data)
  .then((refund) => console.log(refund))
  .catch((error) => console.log(error));
```

#### Get Order Refund

Retrieving a specific refund for an order.

```ts
(async () => {
  try {
    const refund = await client.refunds.getOrderRefund(1234, 4321);
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.refunds
  .getOrderRefund(1234, 4321)
  .then((refund) => console.log(refund))
  .catch((error) => console.log(error));
```

#### Get Order Refunds

Retrieving all refunds for an order.

```ts
(async () => {
  try {
    const refund = await client.refunds.getOrderRefunds(1234);
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.refunds
  .getOrderRefunds(1234)
  .then((refunds) => console.log(refunds))
  .catch((error) => console.log(error));
```

#### Get Refunds

Retrieving all refunds.

```ts
(async () => {
  try {
    const refunds = await client.refunds.getRefunds();
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.refunds
  .getRefunds()
  .then((refunds) => console.log(refunds))
  .catch((error) => console.log(error));
```

### Ledger

#### Get Account

Retrieving specific account.

```ts
(async () => {
  try {
    const account = await client.ledger.getAccount('10801');
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.ledger
  .getAccount('10801')
  .then((account) => console.log(account))
  .catch((error) => console.log(error));
```

#### Get Accounts

Retrieving all accounts.

```ts
const searchParams = { page: 2, per_page: 29 };

(async () => {
  try {
    // search params is optional, and default is { page: 1, per_page: 100 }
    const accounts = await client.ledger.getAccounts(searchParams);
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.ledger
  .getAccounts()
  .then((accounts) => console.log(accounts))
  .catch((error) => console.log(error));
```

### Withdrawals

#### Get Withdrawal

Retrieving specific withdrawal.

```ts
(async () => {
  try {
    const withdrawals = await client.withdrawals.getWithdrawal(0029);
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.withdrawals
  .getWithdrawal(0029)
  .then((withdrawals) => console.log(withdrawal))
  .catch((error) => console.log(error));
```

#### Get Withdrawals

Retrieving all withdrawals.

```ts
const searchParams = { page: 2, per_page: 29 };

(async () => {
  try {
    // search params is optional, and default is { page: 1, per_page: 100 }
    const withdrawals = await client.withdrawals.getWithdrawals(searchParams);
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.withdrawals
  .getWithdrawals()
  .then((withdrawals) => console.log(withdrawals))
  .catch((error) => console.log(error));
```

### Public API

#### Get Exchange Rate

Current exchange rate for any two currencies, fiat or crypto. This endpoint is public, authentication is not required.

```ts
(async () => {
  try {
    const exchangeRate = await client.public.getExchangeRate({
      from: 'GBP',
      to: 'USD'
    });
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.public
  .getExchangeRate({ from: 'GBP', to: 'USD' })
  .then((exchangeRate) => console.log(exchangeRate))
  .catch((error) => console.log(error));
```

#### List Exchange Rates

Current CoinGate exchange rates for Merchants and Traders. This endpoint is public, authentication is not required.

```ts
(async () => {
  try {
    const exchangeRates = await client.public.listExchangeRates();
  } catch {
    // Oops... Something went wrong...
    console.error(error);
  }
})();
```

Or

```ts
client.public
  .getExchangeRates()
  .then((exchangeRates) => console.log(exchangeRates))
  .catch((error) => console.log(error));
```

#### Ping

A health check endpoint for CoinGate API. This endpoint is public, authentication is not required.

```ts
(async () => {
  const pong = await client.public.ping();
})();
```

Or

```ts
client.public.ping().then((pong) => console.log(pong));
```

#### IP Addresses

Get IP addresses of CoinGate servers

```ts
const addresses = await client.public.getIPAddresses(); // Possible to provide separator, like: ', '
```

#### Currencies

```ts
// Search parameters can be passed,
// {
//   native?: boolean;
//   enabled?: boolean;
//   merchant_pay?: boolean;
//   merchant_receive?: boolean;
//   kind?: crypto | fiat;
// }
const currencies = await client.public.getCurrencies();

const checkoutCurrencies = await client.public.getCheckoutCurrencies();

const merchantPayCurrencies = await client.public.getMerchantPayCurrencies();

// Currency kind can be passed
const merchantPayoutCurrencies =
  await client.public.getMerchantPayoutCurrencies();
```

#### Platforms

```ts
const platforms = await client.public.getPlatforms();
```

#### Test API Connection

Test method that returns boolean if api key is good

```ts
const result = client.testConnection('YOUR_API_KEY');
```

#### Set app info

You can set custom app information

```ts
client.setAppInfo({ name: 'My App', version: '0.0.2.9' });
```

#### Set Timeout

You can set custom request timeout

```ts
client.setTimeout(30000);
```

[npm-img]: https://i.imgur.com/Vn5jUDi.png
[npm-url]: https://github.com/konkurenta
