"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyRevenueAction = void 0;
const report_repository_1 = require("../repositories/report.repository");
const getMonthlyRevenueAction = async () => {
    return (0, report_repository_1.getMonthlyRevenue)();
};
exports.getMonthlyRevenueAction = getMonthlyRevenueAction;
//# sourceMappingURL=monthly-revenue.action.js.map