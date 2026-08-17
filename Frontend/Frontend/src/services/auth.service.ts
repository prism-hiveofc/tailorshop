import axiosInstance from "../api/axios";
import API from "../api/endpoints";
import type {
  LoginFormData,
  RegisterFormData,
} from "../types/auth";

export const registerUser = async (
  data: Omit<RegisterFormData, "confirmPassword">
) => {
  const response = await axiosInstance.post(
    API.AUTH.REGISTER,
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginFormData
) => {
  const response = await axiosInstance.post(
    API.AUTH.LOGIN,
    data
  );

  return response.data;
};


export const getMe = async () => {
  const response = await axiosInstance.get(
    API.AUTH.ME
  );

  return response.data;
};


export const logoutUser = async () => {
  const response = await axiosInstance.post(
    API.AUTH.LOGOUT
  );

  return response.data;
};