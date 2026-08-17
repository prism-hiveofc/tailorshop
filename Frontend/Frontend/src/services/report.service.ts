import axiosInstance from "../api/axios";

export const getDailyRevenue = async (
  date: string
) => {
  const response = await axiosInstance.get(
    `/reports/daily-revenue?date=${encodeURIComponent(date)}`
  );

  return response.data;
};

export const getMonthlyRevenue = async () => {
  const response = await axiosInstance.get(
    "/reports/monthly-revenue"
  );

  return response.data;
};

export const getPendingOrders = async () => {
  const response =
    await axiosInstance.get(
      "/reports/pending-orders"
    );

  return response.data;
};

export const getDeliveredOrders = async () => {
  const response =
    await axiosInstance.get(
      "/reports/delivered-orders"
    );

  return response.data;
};

export const getCustomerOrderHistory = async (
  customerId: string
) => {
  const response =
    await axiosInstance.get(
      `/reports/customer/${customerId}`
    );

  return response.data;
};

export const getDateRangeOrders = async (
  from: string,
  to: string
) => {
  const response =
    await axiosInstance.get(
      `/reports/date-range?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}`
    );

  return response.data;
};