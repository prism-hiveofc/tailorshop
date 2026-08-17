"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const order_repostories_1 = require("../repositories/order.repostories");
const customer_repository_1 = require("../../customer/repositories/customer.repository");
const updateOrderAction = async (orderId, data, userId) => {
    const order = await (0, order_repostories_1.findOrderById)(orderId);
    if (!order) {
        throw new app_error_1.AppError("Order not found", 404);
    }
    const customer = await (0, customer_repository_1.customerExists)(data.customerId);
    if (!customer) {
        throw new app_error_1.AppError("Customer not found", 404);
    }
    if (data.advanceAmount >
        data.totalAmount) {
        throw new app_error_1.AppError("Advance amount cannot exceed total amount", 400);
    }
    const balanceAmount = data.totalAmount -
        data.advanceAmount;
    return (0, order_repostories_1.updateOrder)(orderId, {
        ...data,
        balanceAmount,
        updatedBy: userId,
    });
};
exports.updateOrderAction = updateOrderAction;
//# sourceMappingURL=update-order.action.js.map