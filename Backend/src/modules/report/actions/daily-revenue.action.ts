import { getDailyRevenue }
from "../repositories/report.repository";

export const getDailyRevenueAction =
async (date: string) => {
  return getDailyRevenue(date);
};