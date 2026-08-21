"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyRevenueAction = void 0;
const report_repository_1 = require("../repositories/report.repository");
const getDailyRevenueAction = async (date) => {
    return (0, report_repository_1.getDailyRevenue)(date);
};
exports.getDailyRevenueAction = getDailyRevenueAction;
//# sourceMappingURL=daily-revenue.action.js.map