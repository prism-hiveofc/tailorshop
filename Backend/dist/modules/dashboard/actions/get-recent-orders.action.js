"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentOrdersAction = void 0;
const recent_orders_repository_1 = require("../repositories/recent-orders.repository");
const getRecentOrdersAction = async () => {
    const orders = await (0, recent_orders_repository_1.getRecentOrders)();
    return orders;
};
exports.getRecentOrdersAction = getRecentOrdersAction;
//# sourceMappingURL=get-recent-orders.action.js.map