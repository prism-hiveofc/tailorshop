"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentPaymentsAction = void 0;
const recent_payments_repository_1 = require("../repositories/recent-payments.repository");
const getRecentPaymentsAction = async () => {
    const payments = await (0, recent_payments_repository_1.getRecentPayments)();
    return payments;
};
exports.getRecentPaymentsAction = getRecentPaymentsAction;
//# sourceMappingURL=get-recent-payments.action.js.map