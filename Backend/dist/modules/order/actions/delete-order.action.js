"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const order_repostories_1 = require("../repositories/order.repostories");
const deleteOrderAction = async (orderId, userId) => {
    const order = await (0, order_repostories_1.findOrderById)(orderId);
    if (!order) {
        throw new app_error_1.AppError("Order not found", 404);
    }
    await (0, order_repostories_1.softDeleteOrder)(orderId, userId);
};
exports.deleteOrderAction = deleteOrderAction;
//# sourceMappingURL=delete-order.action.js.map