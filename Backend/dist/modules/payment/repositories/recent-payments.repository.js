"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentPayments = void 0;
const payment_model_1 = __importDefault(require("../../payment/models/payment.model"));
const getRecentPayments = async () => {
    return payment_model_1.default.find({
        isDeleted: false
    })
        .populate({
        path: "orderId",
        select: "orderNumber customerId",
        populate: {
            path: "customerId",
            select: "name phone"
        }
    })
        .select("amount paymentMethod remarks orderId createdAt")
        .sort({
        createdAt: -1
    })
        .limit(5);
};
exports.getRecentPayments = getRecentPayments;
//# sourceMappingURL=recent-payments.repository.js.map