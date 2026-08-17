import { getDateRangeOrders }
from "../repositories/report.repository";

export const getDateRangeOrdersAction =
async (
  from: string,
  to: string
) => {

  return getDateRangeOrders(
    from,
    to
  );

};