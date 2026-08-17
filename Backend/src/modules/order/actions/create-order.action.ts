import { AppError } from "../../../shared/errors/app.error";

import { ICreateOrderRequest } from "../interfaces/order.interface";

import { customerExists } from "../../customer/repositories/customer.repository";

import {
  createOrder,
  getLastOrder,
} from "../repositories/order.repostories";

export const createOrderAction = async (
  data: ICreateOrderRequest,
  userId: string
) => {

  // Customer exists?
  const customer = await customerExists(
    data.customerId
  );

  if (!customer) {
    throw new AppError(
      "Customer not found",
      404
    );
  }

  // Business rule
  if (
    data.advanceAmount >
    data.totalAmount
  ) {
    throw new AppError(
      "Advance amount cannot exceed total amount",
      400
    );
  }

  // Balance
  const balanceAmount =
    data.totalAmount -
    data.advanceAmount;

  // Last order
  const lastOrder =
    await getLastOrder();

  let orderNumber = "TS-000001";

  if (lastOrder) {
    const last = Number(
      lastOrder.orderNumber.replace(
        "TS-",
        ""
      )
    );

    orderNumber =
      `TS-${String(last + 1).padStart(6, "0")}`;
  }

  return createOrder({
    ...data,
    orderNumber,
    balanceAmount,
    createdBy: userId,
    updatedBy: userId,
  });
};