import { getMonthlyRevenue }
from "../repositories/report.repository";

export const getMonthlyRevenueAction =
async () => {
  return getMonthlyRevenue();
};