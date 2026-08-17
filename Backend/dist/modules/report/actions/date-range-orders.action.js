"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeOrdersAction = void 0;
const report_repository_1 = require("../repositories/report.repository");
const getDateRangeOrdersAction = async (from, to) => {
    return (0, report_repository_1.getDateRangeOrders)(from, to);
};
exports.getDateRangeOrdersAction = getDateRangeOrdersAction;
//# sourceMappingURL=date-range-orders.action.js.map