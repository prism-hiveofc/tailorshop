import { Router } from "express";

import {getOverviewController, getRecentOrdersController}from "../controllers/dashboard.controller";
import { getRecentPaymentsController } from "../../payment/controllers/payment.controller";


const router = Router();


router.get("/overview", getOverviewController);

router.get("/recent-orders",getRecentOrdersController);

router.get("/recent-payments", getRecentPaymentsController);


export default router;