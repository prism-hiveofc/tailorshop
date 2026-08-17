import { searchCustomer } from "../repositories/customer.repository";

export const searchCustomerAction = async (
  keyword: string
) => {
  return searchCustomer(keyword);
};