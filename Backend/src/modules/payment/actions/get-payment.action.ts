import { AppError } from "../../../shared/errors/app.error";

import { findPaymentById } from "../repositories/payment.repository";

export const getPaymentAction = async (
  paymentId: string
) => {
  const payment = await findPaymentById(
    paymentId
  );

  if (!payment) {
    throw new AppError(
      "Payment not found",
      404
    );
  }

  return payment;
};