import { NextFunction, Response } from "express";

import { IAuthenticatedRequest } from "../interfaces/request.interface";
import { verifyToken } from "../helpers.ts/jwt.helper";

export const authMiddleware = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });

      return;
    }

    const decoded = verifyToken(token);

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};