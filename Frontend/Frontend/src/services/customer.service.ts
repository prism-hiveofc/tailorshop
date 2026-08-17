import axiosInstance from "../api/axios";

import type {
  CustomerFormData,
} from "../types/customer";

export const getCustomers = async () => {
  const response =
    await axiosInstance.get("/customers");

  return response.data;
};

export const searchCustomers = async (
  keyword: string
) => {
  const response =
    await axiosInstance.get(
      `/customers/search?keyword=${keyword}`
    );

  return response.data;
};

export const createCustomer = async (
  data: CustomerFormData
) => {
  const response =
    await axiosInstance.post(
      "/customers",
      data
    );

  return response.data;
};

export const getCustomer = async (
  customerId: string
) => {
  const response =
    await axiosInstance.get(
      `/customers/${customerId}`
    );

  return response.data;
};

export const updateCustomer = async (
  customerId: string,
  data: CustomerFormData
) => {
  const response =
    await axiosInstance.put(
      `/customers/${customerId}`,
      data
    );

  return response.data;
};

export const deleteCustomer = async (
  customerId: string
) => {
  const response =
    await axiosInstance.delete(
      `/customers/${customerId}`
    );

  return response.data;
};