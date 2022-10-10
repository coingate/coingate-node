export type ListOrdersData = {
  per_page?: number;
  page?: number;
  sort?: 'created_at_asc' | 'created_at_desc';
  from?: string;
  to?: string;
};

export type CreateOrderBody = {
  order_id?: string;
  price_amount: number;
  price_currency: string;
  receive_currency: string;
  title?: string;
  description?: string;
  callback_url?: string;
  cancel_url?: string;
  success_url?: string;
  token?: string;
  purchaser_email?: string;
};

export type CheckoutBody = {
  pay_currency: string;
  lightning_network?: boolean;
  purchaser_email?: string;
  platform_id?: string;
};

export type PaymentParamType = {
  id: number;
};

export type Order = {
  id: number;
  status: string;
  do_not_convert?: boolean;
  orderable_type: string;
  orderable_id: number;
  price_currency: string;
  price_amount: string;
  lightning_network?: boolean;
  receive_currency: string;
  receive_amount: string;
  created_at: Date;
  order_id: string;
  payment_url: string;
  underpaid_amount?: string;
  overpaid_amount?: string;
  is_refundable?: boolean;
  refunds?: [];
  voids?: [];
  token?: string;
};

export interface Checkout extends Order {
  pay_currency: string;
  pay_amount: string;
  expire_at: Date;
  payment_address: string;
}
