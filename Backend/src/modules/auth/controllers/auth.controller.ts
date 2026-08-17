import { Request, Response } from "express";

import { loginValidation } from "../validations/login.validation";
import { registerValidation } from "../validations/register.validation";

import { loginAction } from "../actions/login.action";
import { registerAction } from "../actions/register.action";
import { getProfileAction } from "../actions/get-profile.action";

import { asyncHandler } from "../../../shared/utils/async.handler";
import { errorResponse } from "../../../shared/responses/error.response";
import { successResponse } from "../../../shared/responses/success.response";

import { IAuthenticatedRequest } from "../../../shared/interfaces/request.interface";


export const registerController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const { error, value } =
      registerValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const user = await registerAction(value);

    successResponse(
      res,
      "Registration Successful",
      user,
      201
    );
  }
);


export const loginController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const { error, value } =
      loginValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const result = await loginAction(value);

    res.cookie("accessToken", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    successResponse(
      res,
      "Login Successful",
      {
        user: result.user,
      }
    );
  }
);


export const logoutController = asyncHandler(
  async (
    _req: Request,
    res: Response
  ): Promise<void> => {

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    successResponse(
      res,
      "Logout successful",
      null
    );
  }
);


export const getProfileController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    const user = await getProfileAction(
      req.user!.userId
    );

    successResponse(
      res,
      "Profile fetched successfully",
      user
    );
  }
);