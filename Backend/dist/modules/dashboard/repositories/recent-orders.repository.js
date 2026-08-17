"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentOrders = void 0;
const order_model_1 = __importDefault(require("../../order/models/order.model"));
const getRecentOrders = async () => {
    return order_model_1.default.find({
        isDeleted: false
    })
        .populate("customerId", "name phone")
        .select("orderNumber customerId deliveryDate dressType totalAmount status")
        .sort({
        createdAt: -1
    })
        .limit(5);
};
exports.getRecentOrders = getRecentOrders;
//# sourceMappingURL=recent-orders.repository.js.map