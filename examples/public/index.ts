import { CurrencyKindEnum } from '#Modules/Public/types';
import { Client } from '../../src';

const separator = ', myAwesomeSeparator, '; // You choose how you want to separate IP addresses

const client = new Client(); // You don't need api key for public methods

const getIpAddresses = async () => {
  try {
    const addresses = await client.public.getIPAddresses(separator);
    return addresses;
  } catch (e) {
    console.log(e);
  }
};

const getCurrencies = async () => {
  try {
    const currencies = await client.public.getCurrencies({
      native: true,
      enabled: true,
      merchant_pay: true,
      kind: CurrencyKindEnum.CRYPTO,
      merchant_receive: true
    });
    return currencies;
  } catch (e) {
    console.log(e);
  }
};

const init = async () => {
  const addresses = await getIpAddresses();
  const currencies = await getCurrencies();

  console.log({ addresses, currencies });
};
init();
