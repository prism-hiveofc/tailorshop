import { getPendingOrders }
from "../repositories/report.repository";

export const getPendingOrdersAction =
async () => {
  return getPendingOrders();
};