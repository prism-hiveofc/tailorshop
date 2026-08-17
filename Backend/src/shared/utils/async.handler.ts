import { Request, Response, NextFunction } from "express";

export const asyncHandler = <T extends Request>(
  handler: (
    req: T,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  return (
    req: T,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};