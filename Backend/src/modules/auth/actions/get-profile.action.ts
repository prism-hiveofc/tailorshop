import { findUserById } from "../repositories/auth.repository";

export const getProfileAction = async (
  userId: string
) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};