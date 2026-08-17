import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { ENV } from "../../config/env";

export interface IJwtPayload {
  userId: string;
  role: string;
}

export const generateToken = (
  userId: string,
  role: string
): string => {
  return jwt.sign(
    { userId, role },
    ENV.JWT_SECRET,
    {
      expiresIn: ENV.JWT_EXPIRES_IN as StringValue,
    }
  );
};

export const verifyToken = (
  token: string
): IJwtPayload => {
  return jwt.verify(
    token,
    ENV.JWT_SECRET
  ) as IJwtPayload;
};