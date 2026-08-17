export type PaymentMethod =
  | "CASH"
  | "UPI"
  | "CARD"
  | "BANK";

export interface Payment {
  _id: string;

  orderId: {
    _id: string;
    orderNumber: string;
    balanceAmount: number;
  };

  amount: number;

  paymentMethod: PaymentMethod;

  remarks?: string;

  createdAt: string;
}

export interface CreatePaymentFormData {
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  remarks: string;
}