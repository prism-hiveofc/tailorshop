"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverviewAction = void 0;
const dashboard_repository_1 = require("../repositories/dashboard.repository");
const getOverviewAction = async () => {
    const overview = await (0, dashboard_repository_1.getDashboardOverview)();
    return overview;
};
exports.getOverviewAction = getOverviewAction;
//# sourceMappingURL=get-overview.action.js.map