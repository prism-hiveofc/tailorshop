import { AppError } from "../../../shared/errors/app.error";
import { findOrderById } from "../repositories/order.repostories";


export const getOrderAction = async (
  orderId: string
) => {

  const order = await findOrderById(
    orderId
  );

  if (!order) {
    throw new AppError(
      "Order not found",
      404
    );
  }

  return order;
};