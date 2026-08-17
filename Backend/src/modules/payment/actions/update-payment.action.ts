import { AppError } from "../../../shared/errors/app.error";

import {
  findOrderById,
  updateOrderBalance,
} from "../../order/repositories/order.repostories";

import {
  findPaymentById,
  getPaymentsByOrder,
  updatePayment,
} from "../repositories/payment.repository";

export const updatePaymentAction = async (
  paymentId: string,
  data: object,
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

  const updatedPayment =
    await updatePayment(
      paymentId,
      {
        ...data,
        updatedBy: userId,
      }
    );

  const orderId =
    payment.orderId._id.toString();

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

  if (
    totalPaid >
    order.totalAmount
  ) {
    throw new AppError(
      "Total payment cannot exceed order amount",
      400
    );
  }

  const balanceAmount =
    order.totalAmount - totalPaid;

  await updateOrderBalance(
    orderId,
    balanceAmount
  );

  return updatedPayment;
};