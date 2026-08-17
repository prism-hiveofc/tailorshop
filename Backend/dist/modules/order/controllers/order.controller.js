"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = exports.updateOrderController = exports.searchOrdersController = exports.getOrderController = exports.listOrdersController = exports.createOrderController = void 0;
const get_order_action_1 = require("../actions/get-order.action");
const async_handler_1 = require("../../../shared/utils/async.handler");
const success_response_1 = require("../../../shared/responses/success.response");
const error_response_1 = require("../../../shared/responses/error.response");
const create_order_validation_1 = require("../validations/create-order.validation");
const create_order_action_1 = require("../actions/create-order.action");
const list_orders_action_1 = require("../actions/list-orders.action");
const search_order_action_1 = require("../actions/search-order.action");
const update_order_validation_1 = require("../validations/update-order.validation");
const update_order_action_1 = require("../actions/update-order.action");
const delete_order_action_1 = require("../actions/delete-order.action");
exports.createOrderController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = create_order_validation_1.createOrderValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const order = await (0, create_order_action_1.createOrderAction)(value, req.user.userId);
    (0, success_response_1.successResponse)(res, "Order created successfully", order, 201);
});
exports.listOrdersController = (0, async_handler_1.asyncHandler)(async (_req, res) => {
    const orders = await (0, list_orders_action_1.listOrdersAction)();
    (0, success_response_1.successResponse)(res, "Orders fetched successfully", orders);
});
exports.getOrderController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const orderId = req.params.id;
    if (typeof orderId !== "string") {
        throw new Error("Invalid order id");
    }
    const order = await (0, get_order_action_1.getOrderAction)(orderId);
    (0, success_response_1.successResponse)(res, "Order fetched successfully", order);
});
exports.searchOrdersController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const keyword = String(req.query.keyword || "");
    const orders = await (0, search_order_action_1.searchOrdersAction)(keyword);
    (0, success_response_1.successResponse)(res, "Orders fetched successfully", orders);
});
exports.updateOrderController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const { error, value } = update_order_validation_1.updateOrderValidation.validate(req.body);
    if (error) {
        (0, error_response_1.errorResponse)(res, error.details[0].message, 400);
        return;
    }
    const orderId = req.params.id;
    if (typeof orderId !== "string") {
        throw new Error("Invalid order id");
    }
    const order = await (0, update_order_action_1.updateOrderAction)(orderId, value, req.user.userId);
    (0, success_response_1.successResponse)(res, "Order updated successfully", order);
});
exports.deleteOrderController = (0, async_handler_1.asyncHandler)(async (req, res) => {
    const orderId = req.params.id;
    if (typeof orderId !== "string") {
        throw new Error("Invalid order id");
    }
    await (0, delete_order_action_1.deleteOrderAction)(orderId, req.user.userId);
    (0, success_response_1.successResponse)(res, "Order deleted successfully", null);
});
//# sourceMappingURL=order.controller.js.map