import { comparePassword } from "../../../shared/helpers.ts/password.helper";
import { generateToken } from "../../../shared/helpers.ts/jwt.helper";

import { ILoginRequest } from "../interfaces/login.interface";
import { findUserByEmail } from "../repositories/auth.repository";
import { AppError } from "../../../shared/errors/app.error";

export const loginAction = async (
  data: ILoginRequest
) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(
    user._id.toString(),
    user.role
  );

  const { password: _password, ...userData } =
    user.toObject();

  return {
    user: userData,
    token,
  };
};