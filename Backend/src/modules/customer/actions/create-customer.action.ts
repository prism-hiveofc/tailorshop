import { AppError } from "../../../shared/errors/app.error";

import { ICreateCustomerRequest } from "../interfaces/customer.interface";

import {createCustomer, findCustomerByPhone} from "../../customer/repositories/customer.repository";

export const createCustomerAction = async (
  data: ICreateCustomerRequest,userId: string) => {
  const existingCustomer = await findCustomerByPhone(
    data.phone
  );

  if (existingCustomer) {
    throw new AppError(
      "Customer already exists with this phone number",
      409
    );
  }

return createCustomer({
    ...data,
    createdBy: userId,
    updatedBy: userId,
});

};