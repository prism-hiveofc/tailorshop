"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const payment_controller_1 = require("../../payment/controllers/payment.controller");
const router = (0, express_1.Router)();
router.get("/overview", dashboard_controller_1.getOverviewController);
router.get("/recent-orders", dashboard_controller_1.getRecentOrdersController);
router.get("/recent-payments", payment_controller_1.getRecentPaymentsController);
exports.default = router;
//# sourceMappingURL=dashboard.router.js.map