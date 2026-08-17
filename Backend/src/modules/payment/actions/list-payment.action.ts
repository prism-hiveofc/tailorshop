import { listPayments } from "../repositories/payment.repository";

export const listPaymentsAction = async () => {
  return await listPayments();
};