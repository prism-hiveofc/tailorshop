import { AppError } from "../../../shared/errors/app.error";

import {
  findOrderById,
  updateOrder,
} from "../repositories/order.repostories";

import { customerExists } from "../../customer/repositories/customer.repository";

import { ICreateOrderRequest } from "../interfaces/order.interface";

export const updateOrderAction = async (
  orderId: string,
  data: ICreateOrderRequest & {
    status: string;
  },
  userId: string
) => {

  const order = await findOrderById(orderId);

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  const customer = await customerExists(
    data.customerId
  );

  if (!customer) {
    throw new AppError(
      "Customer not found",
      404
    );
  }

  if (
    data.advanceAmount >
    data.totalAmount
  ) {
    throw new AppError(
      "Advance amount cannot exceed total amount",
      400
    );
  }

  const balanceAmount =
    data.totalAmount -
    data.advanceAmount;

  return updateOrder(
    orderId,
    {
      ...data,
      balanceAmount,
      updatedBy: userId,
    }
  );
};