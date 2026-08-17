import { NextFunction, Response } from "express";

import { IAuthenticatedRequest } from "../interfaces/request.interface";
import { errorResponse } from "../responses/error.response";

export const roleMiddleware = (
  ...allowedRoles: string[]
) => {
  return (
    req: IAuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const userRole = req.user?.role;

    if (!userRole) {
      errorResponse(
        res,
        "Unauthorized",
        401
      );
      return;
    }

    if (!allowedRoles.includes(userRole)) {
      errorResponse(
        res,
        "Forbidden",
        403
      );
      return;
    }

    next();
  };
};