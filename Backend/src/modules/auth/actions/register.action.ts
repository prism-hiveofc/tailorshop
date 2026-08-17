import { hashPassword } from "../../../shared/helpers.ts/password.helper";
    import { AppError } from "../../../shared/errors/app.error";

import { IRegisterRequest } from "../interfaces/register.interface";

import {
  createUser,
  findUserByEmail,
  findUserByPhone,
} from "../repositories/auth.repository";

export const registerAction = async (
  data: IRegisterRequest
) => {
  const { name, email, phone, password } = data;

  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {

throw new AppError(
  "Email already exists",
  409
);
  }

  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
 throw new AppError(
  "Phone number already exists",
  409
);
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    email,
    phone,
    password: hashedPassword,
  });

const { password: _password, ...userData } = user.toObject();

return userData;

  return userData;
};