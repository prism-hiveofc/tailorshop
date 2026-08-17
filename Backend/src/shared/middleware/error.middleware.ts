import {
  NextFunction,
  Request,
  Response,
} from "express";

import { AppError } from "../errors/app.error";
import { errorResponse } from "../responses/error.response";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    errorResponse(
      res,
      error.message,
      error.statusCode
    );
    return;
  }

  console.error(error);

  errorResponse(
    res,
    "Internal Server Error",
    500
  );
};