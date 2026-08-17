import { AppError } from "../../../shared/errors/app.error";

import {
  findOrderById,
  updateOrderBalance,
} from "../../order/repositories/order.repostories";

import {
  findPaymentById,
  getPaymentsByOrder,
  softDeletePayment,
} from "../repositories/payment.repository";

export const deletePaymentAction = async (
  paymentId: string,
  userId: string
) => {
  const payment =
    await findPaymentById(paymentId);

  if (!payment) {
    throw new AppError(
      "Payment not found",
      404
    );
  }

  const orderId =
    payment.orderId.toString();

  await softDeletePayment(
    paymentId,
    userId
  );

  const payments =
    await getPaymentsByOrder(orderId);

  const totalPaid =
    payments.reduce(
      (sum, payment) =>
        sum + payment.amount,
      0
    );

  const order =
    await findOrderById(orderId);

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  const balanceAmount =
    order.totalAmount - totalPaid;

  await updateOrderBalance(
    orderId,
    balanceAmount
  );

  return true;
};