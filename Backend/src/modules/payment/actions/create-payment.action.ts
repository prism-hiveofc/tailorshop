import { AppError } from "../../../shared/errors/app.error";

import { createPayment } from "../repositories/payment.repository";

import {
  findOrderById,
  updateOrderBalance,
} from "../../order/repositories/order.repostories";

import { ICreatePaymentRequest } from "../interfaces/payment.interface";

export const createPaymentAction = async (
  data: ICreatePaymentRequest,
  userId: string
) => {

  const order = await findOrderById(
    data.orderId
  );

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  if (
    data.amount >
    order.balanceAmount
  ) {
    throw new AppError(
      "Payment exceeds balance amount",
      400
    );
  }

  const newBalance =
    order.balanceAmount -
    data.amount;

  await updateOrderBalance(
    data.orderId,
    newBalance
  );

  return createPayment({
    ...data,
    createdBy: userId,
    updatedBy: userId,
  });
};