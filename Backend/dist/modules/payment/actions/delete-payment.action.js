"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const order_repostories_1 = require("../../order/repositories/order.repostories");
const payment_repository_1 = require("../repositories/payment.repository");
const deletePaymentAction = async (paymentId, userId) => {
    const payment = await (0, payment_repository_1.findPaymentById)(paymentId);
    if (!payment) {
        throw new app_error_1.AppError("Payment not found", 404);
    }
    const orderId = payment.orderId.toString();
    await (0, payment_repository_1.softDeletePayment)(paymentId, userId);
    const payments = await (0, payment_repository_1.getPaymentsByOrder)(orderId);
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const order = await (0, order_repostories_1.findOrderById)(orderId);
    if (!order) {
        throw new app_error_1.AppError("Order not found", 404);
    }
    const balanceAmount = order.totalAmount - totalPaid;
    await (0, order_repostories_1.updateOrderBalance)(orderId, balanceAmount);
    return true;
};
exports.deletePaymentAction = deletePaymentAction;
//# sourceMappingURL=delete-payment.action.js.map