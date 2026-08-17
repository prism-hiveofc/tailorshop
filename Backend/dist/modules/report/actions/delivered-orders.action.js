"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeliveredOrdersAction = void 0;
const report_repository_1 = require("../repositories/report.repository");
const getDeliveredOrdersAction = async () => {
    return (0, report_repository_1.getDeliveredOrders)();
};
exports.getDeliveredOrdersAction = getDeliveredOrdersAction;
//# sourceMappingURL=delivered-orders.action.js.map