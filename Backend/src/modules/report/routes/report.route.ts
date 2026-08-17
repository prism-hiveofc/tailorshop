import { Router } from "express";

import {
  getDailyRevenueController,
  getDeliveredOrdersController,
  getMonthlyRevenueController,
  getPendingOrdersController,
  getCustomerOrderHistoryController,
  getDateRangeOrdersController
} from "../controllers/report.controller";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

router.get("/daily-revenue", authMiddleware, getDailyRevenueController);
router.get("/monthly-revenue", authMiddleware, getMonthlyRevenueController);
router.get("/pending-orders", authMiddleware, getPendingOrdersController);
router.get("/delivered-orders", authMiddleware, getDeliveredOrdersController);
router.get("/customer/:customerId", authMiddleware, getCustomerOrderHistoryController);
router.get("/date-range", authMiddleware, getDateRangeOrdersController);


export default router;