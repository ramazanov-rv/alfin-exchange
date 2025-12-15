export interface Tariff {
  id: number;
  name: string;
  price_rub: string;
}

export interface Service {
  id: number;
  name: string;
  supports_link_payment: boolean;
  tariffs: Tariff[];
}


export interface ServiceRate {
  show_rate: number;
  rate: number;
}

export interface CreatePaymentData {
  service_name: string;
  amount_usd: number;
  amount_rub: number;
  exchange_rate: number;
  payment_link: string;
}

export interface Payment {
  service_order_id: number;
  payment_url: string;
  amount_rub: number;
  expires_at: string;
  confirmation_token: string;
}