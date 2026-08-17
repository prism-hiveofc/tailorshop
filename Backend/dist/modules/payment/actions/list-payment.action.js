"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPaymentsAction = void 0;
const payment_repository_1 = require("../repositories/payment.repository");
const listPaymentsAction = async () => {
    return await (0, payment_repository_1.listPayments)();
};
exports.listPaymentsAction = listPaymentsAction;
//# sourceMappingURL=list-payment.action.js.map