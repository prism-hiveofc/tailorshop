import axiosInstance from "../api/axios";

export const getDashboard = async () => {
  const response = await axiosInstance.get("/dashboard/overview");

  return response.data;
};

export const getRecentOrders = async () => {
  const response = await axiosInstance.get("/dashboard/recent-orders");

  return response.data;
};