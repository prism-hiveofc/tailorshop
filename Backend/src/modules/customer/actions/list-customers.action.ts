import { listCustomers } from "../repositories/customer.repository";

export const listCustomersAction = async () => {
  return listCustomers();
};