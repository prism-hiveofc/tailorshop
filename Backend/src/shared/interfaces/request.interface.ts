import { Request } from "express";

export interface IUserPayload {
  userId: string;
  role: string;
}

export interface IAuthenticatedRequest extends Request {
  user?: IUserPayload;
}