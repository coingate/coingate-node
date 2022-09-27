export type CreateOrderRefundBody = {
  amount: number;
  address: string;
  address_memo?: string;
  currency_id: number;
  platform_id: number;
  reason: string;
  email: string;
  ledger_account_id: string;
};

export type RefundParamsType = { order_id?: number; id?: number };
