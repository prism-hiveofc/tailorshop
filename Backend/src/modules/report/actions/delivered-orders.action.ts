import { getDeliveredOrders }
from "../repositories/report.repository";

export const getDeliveredOrdersAction =
async () => {

  return getDeliveredOrders();

};