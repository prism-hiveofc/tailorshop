"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const order_repostories_1 = require("../repositories/order.repostories");
const getOrderAction = async (orderId) => {
    const order = await (0, order_repostories_1.findOrderById)(orderId);
    if (!order) {
        throw new app_error_1.AppError("Order not found", 404);
    }
    return order;
};
exports.getOrderAction = getOrderAction;
//# sourceMappingURL=get-order.action.js.map