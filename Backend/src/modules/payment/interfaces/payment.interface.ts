export type PaymentMethod =
  | "CASH"
  | "UPI"
  | "CARD"
  | "BANK";

export interface ICreatePaymentRequest {
  orderId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  remarks: string;
}