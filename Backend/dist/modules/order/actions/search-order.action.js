"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOrdersAction = void 0;
const order_repostories_1 = require("../repositories/order.repostories");
const searchOrdersAction = async (keyword) => {
    return await (0, order_repostories_1.searchOrders)(keyword);
};
exports.searchOrdersAction = searchOrdersAction;
//# sourceMappingURL=search-order.action.js.map