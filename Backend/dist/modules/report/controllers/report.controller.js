"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeOrdersController = exports.getPendingOrdersController = exports.getCustomerOrderHistoryController = exports.getDeliveredOrdersController = exports.getMonthlyRevenueController = exports.getDailyRevenueController = void 0;
const async_handler_1 = require("../../../shared/utils/async.handler");
const success_response_1 = require("../../../shared/responses/success.response");
const daily_revenue_action_1 = require("../actions/daily-revenue.action");
exports.getDailyRevenueController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const revenue = await (0, daily_revenue_action_1.getDailyRevenueAction)();
    (0, success_response_1.successResponse)(res, "Daily revenue fetched successfully", revenue);
});
const monthly_revenue_action_1 = require("../actions/monthly-revenue.action");
const pending_order_actions_1 = require("../actions/pending-order.actions");
exports.getMonthlyRevenueController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const revenue = await (0, monthly_revenue_action_1.getMonthlyRevenueAction)();
    (0, success_response_1.successResponse)(res, "Monthly revenue fetched successfully", revenue);
});
const delivered_orders_action_1 = require("../actions/delivered-orders.action");
const customer_order_history_action_1 = require("../actions/customer-order-history.action");
const date_range_orders_action_1 = require("../actions/date-range-orders.action");
exports.getDeliveredOrdersController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const orders = await (0, delivered_orders_action_1.getDeliveredOrdersAction)();
    (0, success_response_1.successResponse)(res, "Delivered orders fetched successfully", orders);
});
exports.getCustomerOrderHistoryController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const orders = await (0, customer_order_history_action_1.getCustomerOrderHistoryAction)(req.params.customerId);
    (0, success_response_1.successResponse)(res, "Customer order history fetched successfully", orders);
});
exports.getPendingOrdersController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const orders = await (0, pending_order_actions_1.getPendingOrdersAction)();
    (0, success_response_1.successResponse)(res, "Pending orders fetched successfully", orders);
});
exports.getDateRangeOrdersController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const from = String(req.query.from);
    const to = String(req.query.to);
    const orders = await (0, date_range_orders_action_1.getDateRangeOrdersAction)(from, to);
    (0, success_response_1.successResponse)(res, "Date range orders fetched successfully", orders);
});
//# sourceMappingURL=report.controller.js.map