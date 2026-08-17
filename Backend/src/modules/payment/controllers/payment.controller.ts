import { Response } from "express";
import { getPaymentAction } from "../actions/get-payment.action";
import { Request } from "express";
import { asyncHandler } from "../../../shared/utils/async.handler";
import { successResponse } from "../../../shared/responses/success.response";
import { errorResponse } from "../../../shared/responses/error.response";

import { IAuthenticatedRequest } from "../../../shared/interfaces/request.interface";

import { createPaymentValidation } from "../validations/create-payment.validation";
import { createPaymentAction } from "../actions/create-payment.action";
import { listPaymentsAction } from "../actions/list-payment.action";
import { searchPaymentAction } from "../actions/search-payment.action";
import { updatePaymentAction } from "../actions/update-payment.action";
import { updatePaymentValidation } from "../validations/update-payment.validation";
import { deletePaymentAction } from "../actions/delete-payment.action";
import { getRecentPaymentsAction } from "../actions/get-recent-payments.action";
export const createPaymentController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    const { error, value } =
      createPaymentValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const payment = await createPaymentAction(
      value,
      req.user!.userId
    );

    successResponse(
      res,
      "Payment created successfully",
      payment,
      201
    );
  }
);

export const listPaymentsController = asyncHandler(
  async (_req, res): Promise<void> => {
    const payments = await listPaymentsAction();

    successResponse(
      res,
      "Payments fetched successfully",
      payments
    );
  }
);


export const getPaymentController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const paymentId = req.params.id;

    if (typeof paymentId !== "string") {
      throw new Error("Invalid payment id");
    }

    const payment =
      await getPaymentAction(paymentId);

    successResponse(
      res,
      "Payment fetched successfully",
      payment
    );
  }
);


export const searchPaymentController = asyncHandler(
  async (req, res): Promise<void> => {
    const keyword = String(
      req.query.keyword || ""
    );

    const payments =
      await searchPaymentAction(keyword);

    successResponse(
      res,
      "Payments fetched successfully",
      payments
    );
  }
);

export const updatePaymentController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    const { error, value } =
      updatePaymentValidation.validate(
        req.body
      );

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const payment =
      await updatePaymentAction(
        req.params.id,
        value,
        req.user!.userId
      );

    successResponse(
      res,
      "Payment updated successfully",
      payment
    );
  }
);



export const deletePaymentController = asyncHandler(
  async (req: IAuthenticatedRequest, res) => {
    await deletePaymentAction(
      req.params.id,
      req.user!.userId
    );

    successResponse(
      res,
      "Payment deleted successfully",
      null
    );
  }
);


export const getRecentPaymentsController =
asyncHandler(

async(
 req,
 res:Response
):Promise<void>=>{


 const payments =
 await getRecentPaymentsAction();


 successResponse(
  res,
  "Recent payments fetched successfully",
  payments
 );


}

);