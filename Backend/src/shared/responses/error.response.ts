import { Response } from "express";

export const errorResponse = (
  response: Response,
  message: string,
  statusCode = 500
): void => {
  response.status(statusCode).json({
    success: false,
    message,
  });
};