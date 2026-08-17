import { Request, Response } from "express";
import { listCustomersAction } from "../actions/list-customers.action";
import { getCustomerAction } from "../actions/get-customer.action";
import { searchCustomerAction } from "../actions/search-customer.action";

import { asyncHandler } from "../../../shared/utils/async.handler";
import { successResponse } from "../../../shared/responses/success.response";
import { errorResponse } from "../../../shared/responses/error.response";

import { IAuthenticatedRequest } from "../../../shared/interfaces/request.interface";

import { createCustomerValidation } from "../validations/create-customer.validation";
import { createCustomerAction } from "../actions/create-customer.action";
import { updateCustomerValidation } from "../validations/update-customer.validation";
import { updateCustomerAction } from "../actions/update-customer.action";
import { deleteCustomerAction } from "../actions/delete-customer.action";

export const createCustomerController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const { error, value } =
      createCustomerValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const customer = await createCustomerAction(
      value,
      req.user!.userId
    );

    successResponse(
      res,
      "Customer created successfully",
      customer,
      201
    );
  }
);

export const updateCustomerController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const customerId = req.params.id;

    if (typeof customerId !== "string") {
      throw new Error("Invalid customer id");
    }

    const { error, value } =
      updateCustomerValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const customer = await updateCustomerAction(
      customerId,
      value,
      req.user!.userId
    );

    successResponse(
      res,
      "Customer updated successfully",
      customer
    );
  }
);

export const listCustomersController = asyncHandler(
  async (_req, res): Promise<void> => {
    const customers = await listCustomersAction();

    successResponse(
      res,
      "Customers fetched successfully",
      customers
    );
  }
);


export const getCustomerController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
const customerId = req.params.id;

if (typeof customerId !== "string") {
  throw new Error("Invalid customer id");
}

const customer = await getCustomerAction(customerId);

    successResponse(
      res,
      "Customer fetched successfully",
      customer
    );
  }
);


export const searchCustomerController = asyncHandler(
  async (req, res): Promise<void> => {
    console.log("✅ Search Controller Called");

    const keyword = String(req.query.keyword || "");

    const customers = await searchCustomerAction(keyword);

    successResponse(
      res,
      "Customers fetched successfully",
      customers
    );
  }
);


export const deleteCustomerController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {
    const customerId = req.params.id;

    if (typeof customerId !== "string") {
      throw new Error("Invalid customer id");
    }

    await deleteCustomerAction(
      customerId,
      req.user!.userId
    );

    successResponse(
      res,
      "Customer deleted successfully",
      null
    );
  }
);