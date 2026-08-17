"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentAction = void 0;
const payment_repository_1 = require("../repositories/payment.repository");
const deletePaymentAction = async (paymentId, userId) => {
    const payment = await (0, payment_repository_1.softDeletePayment)(paymentId, userId);
    if (!payment) {
        throw new Error("Payment not found");
    }
    return payment;
};
exports.deletePaymentAction = deletePaymentAction;
//# sourceMappingURL=delete-payment.action.js.map