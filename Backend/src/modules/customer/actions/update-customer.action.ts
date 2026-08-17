import { AppError } from "../../../shared/errors/app.error";

import { ICreateCustomerRequest } from "../interfaces/customer.interface";

import {
  findCustomerById,
  findCustomerByPhone,
  updateCustomer,
} from "../repositories/customer.repository";

export const updateCustomerAction = async (
  customerId: string,
  data: ICreateCustomerRequest,
  userId: string
) => {
  const customer = await findCustomerById(customerId);

  if (!customer) {
    throw new AppError(
      "Customer not found",
      404
    );
  }

  const existingCustomer =
    await findCustomerByPhone(data.phone);

  if (
    existingCustomer &&
    existingCustomer.id !== customerId
  ) {
    throw new AppError(
      "Phone number already exists",
      409
    );
  }

  return updateCustomer(
    customerId,
    {
      ...data,
      updatedBy: userId,
    }
  );
};