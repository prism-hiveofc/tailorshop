import { Response } from "express";

export const successResponse = (
  response: Response,
  message: string,
  data?: unknown,
  statusCode = 200
): void => {
  response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};