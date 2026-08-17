"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentOrdersController = exports.getOverviewController = void 0;
const async_handler_1 = require("../../../shared/utils/async.handler");
const success_response_1 = require("../../../shared/responses/success.response");
const get_overview_action_1 = require("../actions/get-overview.action");
const get_recent_orders_action_1 = require("../actions/get-recent-orders.action");
exports.getOverviewController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const overview = await (0, get_overview_action_1.getOverviewAction)();
    (0, success_response_1.successResponse)(res, "Dashboard overview fetched successfully", overview);
});
exports.getRecentOrdersController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const orders = await (0, get_recent_orders_action_1.getRecentOrdersAction)();
    (0, success_response_1.successResponse)(res, "Recent orders fetched successfully", orders);
});
//# sourceMappingURL=dashboard.controller.js.map