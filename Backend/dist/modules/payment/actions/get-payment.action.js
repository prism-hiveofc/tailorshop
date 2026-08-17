"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const payment_repository_1 = require("../repositories/payment.repository");
const getPaymentAction = async (paymentId) => {
    const payment = await (0, payment_repository_1.findPaymentById)(paymentId);
    if (!payment) {
        throw new app_error_1.AppError("Payment not found", 404);
    }
    return payment;
};
exports.getPaymentAction = getPaymentAction;
//# sourceMappingURL=get-payment.action.js.map