import axiosInstance from "../api/axios";
import type { CreatePaymentFormData } from "../types/payment";

export const getPayments = async () => {
  const response =
    await axiosInstance.get("/payments");

  return response.data;
};

export const searchPayments = async (
  keyword: string
) => {
  const response =
    await axiosInstance.get(
      `/payments/search?keyword=${encodeURIComponent(
        keyword
      )}`
    );

  return response.data;
};

export const getPayment = async (
  paymentId: string
) => {
  const response =
    await axiosInstance.get(
      `/payments/${paymentId}`
    );

  return response.data;
};

export const createPayment = async (
  data: CreatePaymentFormData
) => {
  const response =
    await axiosInstance.post(
      "/payments",
      data
    );

  return response.data;
};

export const updatePayment = async (
  paymentId: string,
  data: Omit<
    CreatePaymentFormData,
    "orderId"
  >
) => {
  const response =
    await axiosInstance.put(
      `/payments/${paymentId}`,
      data
    );

  return response.data;
};

export const deletePayment = async (
  paymentId: string
) => {
  const response =
    await axiosInstance.delete(
      `/payments/${paymentId}`
    );

  return response.data;
};