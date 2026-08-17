import { AppError } from "../../../shared/errors/app.error";

import {
  findOrderById,
  softDeleteOrder,
} from "../repositories/order.repostories";

export const deleteOrderAction = async (
  orderId: string,
  userId: string
) => {
  const order = await findOrderById(orderId);

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  await softDeleteOrder(
    orderId,
    userId
  );
};