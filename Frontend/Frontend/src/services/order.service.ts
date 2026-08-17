import axiosInstance from "../api/axios";

export const getOrders = async () => {
  console.log("GET ORDERS CALLED");
  console.log("BASE URL:", axiosInstance.defaults.baseURL);
  console.log(
    "CREDENTIALS:",
    axiosInstance.defaults.withCredentials
  );

  const response = await axiosInstance.get("/orders");

  return response.data;
};

export const searchOrders = async (
  keyword: string
) => {
  const response = await axiosInstance.get(
    `/orders/search?keyword=${encodeURIComponent(keyword)}`
  );

  return response.data;
};

export const getOrder = async (
  orderId: string
) => {
  const response = await axiosInstance.get(
    `/orders/${orderId}`
  );

  return response.data;
};

export const createOrder = async (
  data: unknown
) => {
  const response = await axiosInstance.post(
    "/orders",
    data
  );

  return response.data;
};

export const updateOrder = async (
  orderId: string,
  data: unknown
) => {
  const response = await axiosInstance.put(
    `/orders/${orderId}`,
    data
  );

  return response.data;
};

export const deleteOrder = async (
  orderId: string
) => {
  const response = await axiosInstance.delete(
    `/orders/${orderId}`
  );

  return response.data;
};