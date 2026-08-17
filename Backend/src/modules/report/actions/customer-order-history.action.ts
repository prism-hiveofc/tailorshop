import { getCustomerOrderHistory }
from "../repositories/report.repository";

export const getCustomerOrderHistoryAction =
async (customerId: string) => {

  return getCustomerOrderHistory(
    customerId
  );

};