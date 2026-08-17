import { AppError } from "../../../shared/errors/app.error";

import { findCustomerById } from "../repositories/customer.repository";

export const getCustomerAction = async (
  customerId: string
) => {
  const customer = await findCustomerById(customerId);

  if (!customer) {
    throw new AppError("Customer not found", 404);
  }

  return customer;
};