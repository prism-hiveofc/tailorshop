import { searchPayments } from "../repositories/payment.repository";

export const searchPaymentAction = async (
  keyword: string
) => {
  return await searchPayments(keyword);
};