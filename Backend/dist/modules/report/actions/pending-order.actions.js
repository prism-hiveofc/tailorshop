"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPendingOrdersAction = void 0;
const report_repository_1 = require("../repositories/report.repository");
const getPendingOrdersAction = async () => {
    return (0, report_repository_1.getPendingOrders)();
};
exports.getPendingOrdersAction = getPendingOrdersAction;
//# sourceMappingURL=pending-order.actions.js.map