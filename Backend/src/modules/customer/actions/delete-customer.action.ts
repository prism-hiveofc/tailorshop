import { AppError } from "../../../shared/errors/app.error";

import {
  findCustomerById,
  softDeleteCustomer,
} from "../repositories/customer.repository";

export const deleteCustomerAction = async (
  customerId: string,
  userId: string
) => {
  const customer = await findCustomerById(customerId);

  if (!customer) {
    throw new AppError(
      "Customer not found",
      404
    );
  }

  return softDeleteCustomer(
    customerId,
    userId
  );
};