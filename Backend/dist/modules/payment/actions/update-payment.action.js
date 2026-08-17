"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const order_repostories_1 = require("../../order/repositories/order.repostories");
const payment_repository_1 = require("../repositories/payment.repository");
const updatePaymentAction = async (paymentId, data, userId) => {
    const payment = await (0, payment_repository_1.findPaymentById)(paymentId);
    if (!payment) {
        throw new app_error_1.AppError("Payment not found", 404);
    }
    const updatedPayment = await (0, payment_repository_1.updatePayment)(paymentId, {
        ...data,
        updatedBy: userId,
    });
    const payments = await (0, payment_repository_1.getPaymentsByOrder)(payment.orderId.toString());
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const order = await (0, order_repostories_1.findOrderById)(payment.orderId.toString());
    if (!order) {
        throw new app_error_1.AppError("Order not found", 404);
    }
    if (totalPaid > order.totalAmount) {
        throw new app_error_1.AppError("Total payment cannot exceed order amount", 400);
    }
    const balanceAmount = order.totalAmount - totalPaid;
    await (0, order_repostories_1.updateOrderBalance)(order._id.toString(), balanceAmount);
    return updatedPayment;
};
exports.updatePaymentAction = updatePaymentAction;
//# sourceMappingURL=update-payment.action.js.map