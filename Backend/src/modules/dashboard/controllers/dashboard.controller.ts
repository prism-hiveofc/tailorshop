import { Response } from "express";

import { asyncHandler }
from "../../../shared/utils/async.handler";

import { successResponse }
from "../../../shared/responses/success.response";

import { getOverviewAction }
from "../actions/get-overview.action";
import { getRecentOrdersAction } from "../actions/get-recent-orders.action";



export const getOverviewController =
asyncHandler(

async(
 req,
 res:Response
):Promise<void>=>{


 const overview =
 await getOverviewAction();



 successResponse(
   res,
   "Dashboard overview fetched successfully",
   overview
 );


}

);



export const getRecentOrdersController =
asyncHandler(

async(
 req,
 res:Response
):Promise<void>=>{


 const orders =
 await getRecentOrdersAction();


 successResponse(
  res,
  "Recent orders fetched successfully",
  orders
 );


}

);