
import { searchOrders } from "../repositories/order.repostories";

export const searchOrdersAction = async (
  keyword: string
) => {
  return await searchOrders(keyword);
};