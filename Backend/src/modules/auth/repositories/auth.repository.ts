import User from "../models/user.model";
import { IRegisterRequest } from "../interfaces/register.interface";

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const findUserByPhone = async (phone: string) => {
  return await User.findOne({ phone });
};

export const createUser = async (data: IRegisterRequest) => {
  return await User.create(data);
};

export const findUserById = async (
  userId: string
) => {
  return User.findById(userId).select("-password");
};