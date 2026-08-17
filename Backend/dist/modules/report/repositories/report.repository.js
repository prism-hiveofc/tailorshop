"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeOrders = exports.getCustomerOrderHistory = exports.getDeliveredOrders = exports.getPendingOrders = exports.getMonthlyRevenue = exports.getDailyRevenue = void 0;
const payment_model_1 = __importDefault(require("../../payment/models/payment.model"));
const getDailyRevenue = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return payment_model_1.default.aggregate([
        {
            $match: {
                isDeleted: false,
                createdAt: {
                    $gte: today,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$amount",
                },
                totalPayments: {
                    $sum: 1,
                },
            },
        },
    ]);
};
exports.getDailyRevenue = getDailyRevenue;
const getMonthlyRevenue = async () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return payment_model_1.default.aggregate([
        {
            $match: {
                isDeleted: false,
                createdAt: {
                    $gte: startOfMonth,
                },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$amount",
                },
                totalPayments: {
                    $sum: 1,
                },
            },
        },
    ]);
};
exports.getMonthlyRevenue = getMonthlyRevenue;
const order_model_1 = __importDefault(require("../../order/models/order.model"));
const getPendingOrders = async () => {
    return order_model_1.default.find({
        status: "PENDING",
        isDeleted: false,
    })
        .populate("customerId", "name phone")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.getPendingOrders = getPendingOrders;
const getDeliveredOrders = async () => {
    return order_model_1.default.find({
        status: "DELIVERED",
        isDeleted: false,
    })
        .populate("customerId", "name phone")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.getDeliveredOrders = getDeliveredOrders;
const getCustomerOrderHistory = async (customerId) => {
    return order_model_1.default.find({
        customerId,
        isDeleted: false,
    })
        .populate("customerId", "name phone")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.getCustomerOrderHistory = getCustomerOrderHistory;
const getDateRangeOrders = async (from, to) => {
    return order_model_1.default.find({
        isDeleted: false,
        createdAt: {
            $gte: new Date(from),
            $lte: new Date(to),
        },
    })
        .populate("customerId", "name phone")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.getDateRangeOrders = getDateRangeOrders;
//# sourceMappingURL=report.repository.js.map