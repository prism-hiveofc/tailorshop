import { Response } from "express";

import { asyncHandler }
from "../../../shared/utils/async.handler";

import { successResponse }
from "../../../shared/responses/success.response";

import { getDailyRevenueAction }
from "../actions/daily-revenue.action";

export const getDailyRevenueController =
asyncHandler(
  async (
    req,
    res: Response
  ): Promise<void> => {

    const date = String(req.query.date);

    const revenue =
      await getDailyRevenueAction(date);

    successResponse(
      res,
      "Daily revenue fetched successfully",
      revenue
    );
  }
);


import { getMonthlyRevenueAction }
from "../actions/monthly-revenue.action";
import { getPendingOrdersAction } from "../actions/pending-order.actions";

export const getMonthlyRevenueController =
asyncHandler(
  async (_req, res: Response): Promise<void> => {

    const revenue =
      await getMonthlyRevenueAction();

    successResponse(
      res,
      "Monthly revenue fetched successfully",
      revenue
    );

  }
);



import { getDeliveredOrdersAction }
from "../actions/delivered-orders.action";
import { getCustomerOrderHistoryAction } from "../actions/customer-order-history.action";
import { getDateRangeOrdersAction } from "../actions/date-range-orders.action";

export const getDeliveredOrdersController =
asyncHandler(

async (_req, res: Response): Promise<void> => {

  const orders =
    await getDeliveredOrdersAction();

  successResponse(
    res,
    "Delivered orders fetched successfully",
    orders
  );

}

);


export const getCustomerOrderHistoryController =
asyncHandler(

async (req, res: Response): Promise<void> => {

  const orders =
    await getCustomerOrderHistoryAction(
      req.params.customerId
    );

  successResponse(
    res,
    "Customer order history fetched successfully",
    orders
  );

}

);



export const getPendingOrdersController =
asyncHandler(

async (_req, res: Response): Promise<void> => {

  const orders =
    await getPendingOrdersAction();

  successResponse(
    res,
    "Pending orders fetched successfully",
    orders
  );

}

);


export const getDateRangeOrdersController =
asyncHandler(

async (req, res: Response): Promise<void> => {

  const from = String(req.query.from);

  const to = String(req.query.to);

  const orders =
    await getDateRangeOrdersAction(
      from,
      to
    );

  successResponse(
    res,
    "Date range orders fetched successfully",
    orders
  );

}

);