"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerOrderHistoryAction = void 0;
const report_repository_1 = require("../repositories/report.repository");
const getCustomerOrderHistoryAction = async (customerId) => {
    return (0, report_repository_1.getCustomerOrderHistory)(customerId);
};
exports.getCustomerOrderHistoryAction = getCustomerOrderHistoryAction;
//# sourceMappingURL=customer-order-history.action.js.map