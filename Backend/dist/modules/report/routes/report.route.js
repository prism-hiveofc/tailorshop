"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controllers/report.controller");
const auth_middleware_1 = require("../../../shared/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/daily-revenue", auth_middleware_1.authMiddleware, report_controller_1.getDailyRevenueController);
router.get("/monthly-revenue", auth_middleware_1.authMiddleware, report_controller_1.getMonthlyRevenueController);
router.get("/pending-orders", auth_middleware_1.authMiddleware, report_controller_1.getPendingOrdersController);
router.get("/delivered-orders", auth_middleware_1.authMiddleware, report_controller_1.getDeliveredOrdersController);
router.get("/customer/:customerId", auth_middleware_1.authMiddleware, report_controller_1.getCustomerOrderHistoryController);
router.get("/date-range", auth_middleware_1.authMiddleware, report_controller_1.getDateRangeOrdersController);
exports.default = router;
//# sourceMappingURL=report.route.js.map