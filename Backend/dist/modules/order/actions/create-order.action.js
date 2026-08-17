"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderAction = void 0;
const app_error_1 = require("../../../shared/errors/app.error");
const customer_repository_1 = require("../../customer/repositories/customer.repository");
const order_repostories_1 = require("../repositories/order.repostories");
const createOrderAction = async (data, userId) => {
    // Customer exists?
    const customer = await (0, customer_repository_1.customerExists)(data.customerId);
    if (!customer) {
        throw new app_error_1.AppError("Customer not found", 404);
    }
    // Business rule
    if (data.advanceAmount >
        data.totalAmount) {
        throw new app_error_1.AppError("Advance amount cannot exceed total amount", 400);
    }
    // Balance
    const balanceAmount = data.totalAmount -
        data.advanceAmount;
    // Last order
    const lastOrder = await (0, order_repostories_1.getLastOrder)();
    let orderNumber = "TS-000001";
    if (lastOrder) {
        const last = Number(lastOrder.orderNumber.replace("TS-", ""));
        orderNumber =
            `TS-${String(last + 1).padStart(6, "0")}`;
    }
    return (0, order_repostories_1.createOrder)({
        ...data,
        orderNumber,
        balanceAmount,
        createdBy: userId,
        updatedBy: userId,
    });
};
exports.createOrderAction = createOrderAction;
//# sourceMappingURL=create-order.action.js.map