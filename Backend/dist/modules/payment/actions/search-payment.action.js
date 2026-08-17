"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPaymentAction = void 0;
const payment_repository_1 = require("../repositories/payment.repository");
const searchPaymentAction = async (keyword) => {
    return await (0, payment_repository_1.searchPayments)(keyword);
};
exports.searchPaymentAction = searchPaymentAction;
//# sourceMappingURL=search-payment.action.js.map