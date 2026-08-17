import { Response } from "express";
import { Request } from "express";

import { getOrderAction } from "../actions/get-order.action";
import { asyncHandler } from "../../../shared/utils/async.handler";
import { successResponse } from "../../../shared/responses/success.response";
import { errorResponse } from "../../../shared/responses/error.response";

import { IAuthenticatedRequest } from "../../../shared/interfaces/request.interface";

import { createOrderValidation } from "../validations/create-order.validation";
import { createOrderAction } from "../actions/create-order.action";
import { listOrdersAction } from "../actions/list-orders.action";
import { searchOrdersAction } from "../actions/search-order.action";
import { updateOrderValidation } from "../validations/update-order.validation";
import { updateOrderAction } from "../actions/update-order.action";
import { deleteOrderAction } from "../actions/delete-order.action";

export const createOrderController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    const { error, value } =
      createOrderValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const order = await createOrderAction(
      value,
      req.user!.userId
    );

    successResponse(
      res,
      "Order created successfully",
      order,
      201
    );
  }
);

export const listOrdersController = asyncHandler(
  async (_req, res): Promise<void> => {

    const orders = await listOrdersAction();

    successResponse(
      res,
      "Orders fetched successfully",
      orders
    );
  }
);

export const getOrderController = asyncHandler(
  async (
    req: Request,
    res: Response
  ): Promise<void> => {

    const orderId = req.params.id;

    if (typeof orderId !== "string") {
      throw new Error("Invalid order id");
    }

    const order = await getOrderAction(
      orderId
    );

    successResponse(
      res,
      "Order fetched successfully",
      order
    );
  }
);

export const searchOrdersController = asyncHandler(
  async (req, res): Promise<void> => {

    const keyword = String(
      req.query.keyword || ""
    );

    const orders =
      await searchOrdersAction(keyword);

    successResponse(
      res,
      "Orders fetched successfully",
      orders
    );
  }
);

export const updateOrderController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    const { error, value } =
      updateOrderValidation.validate(req.body);

    if (error) {
      errorResponse(
        res,
        error.details[0].message,
        400
      );
      return;
    }

    const orderId = req.params.id;

    if (typeof orderId !== "string") {
      throw new Error("Invalid order id");
    }

    const order = await updateOrderAction(
      orderId,
      value,
      req.user!.userId
    );

    successResponse(
      res,
      "Order updated successfully",
      order
    );
  }
);

export const deleteOrderController = asyncHandler(
  async (
    req: IAuthenticatedRequest,
    res: Response
  ): Promise<void> => {

    const orderId = req.params.id;

    if (typeof orderId !== "string") {
      throw new Error("Invalid order id");
    }

    await deleteOrderAction(
      orderId,
      req.user!.userId
    );

    successResponse(
      res,
      "Order deleted successfully",
      null
    );
  }
);