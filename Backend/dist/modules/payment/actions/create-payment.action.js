"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const payment_repository_1 = require("../repositories/payment.repository");
const order_repostories_1 = require("../../order/repositories/order.repostories");
const createPaymentAction = async (data, userId) => {
    const order = await (0, order_repostories_1.findOrderById)(data.orderId);
    if (!order) {
        throw new app_error_1.AppError("Order not found", 404);
    }
    if (data.amount >
        order.balanceAmount) {
        throw new app_error_1.AppError("Payment exceeds balance amount", 400);
    }
    const newBalance = order.balanceAmount -
        data.amount;
    await (0, order_repostories_1.updateOrderBalance)(data.orderId, newBalance);
    return (0, payment_repository_1.createPayment)({
        ...data,
        createdBy: userId,
        updatedBy: userId,
    });
};
exports.createPaymentAction = createPaymentAction;
//# sourceMappingURL=create-payment.action.js.map