"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOrdersAction = void 0;
const order_repostories_1 = require("../repositories/order.repostories");
const listOrdersAction = async () => {
    return await (0, order_repostories_1.listOrders)();
};
exports.listOrdersAction = listOrdersAction;
//# sourceMappingURL=list-orders.action.js.map