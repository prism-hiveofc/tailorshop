import axiosInstance from "../api/axios";

import type { CreatePaymentFormData } from "../validation/auth/payment/create-payment.schema";

import type { UpdatePaymentFormData } from "../validation/auth/payment/update-payment.schema";

export const getPayments = async () => {
  const response = await axiosInstance.get("/payments");

  return response.data;
};

export const searchPayments = async (keyword: string) => {
  const response = await axiosInstance.get(
    `/payments/search?keyword=${encodeURIComponent(keyword)}`
  );

  return response.data;
};

export const getPayment = async (paymentId: string) => {
  const response = await axiosInstance.get(`/payments/${paymentId}`);

  return response.data;
};

export const createPayment = async (
  data: CreatePaymentFormData
) => {
  const response = await axiosInstance.post(
    "/payments",
    data
  );

  return response.data;
};

export const updatePayment = async (
  paymentId: string,
  data: UpdatePaymentFormData
) => {
  const response = await axiosInstance.put(
    `/payments/${paymentId}`,
    data
  );

  return response.data;
};

export const deletePayment = async (
  paymentId: string
) => {
  const response = await axiosInstance.delete(
    `/payments/${paymentId}`
  );

  return response.data;
};