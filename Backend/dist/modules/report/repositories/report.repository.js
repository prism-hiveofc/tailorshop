"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRangeOrders = exports.getCustomerOrderHistory = exports.getDeliveredOrders = exports.getPendingOrders = exports.getMonthlyRevenue = exports.getDailyRevenue = void 0;
const payment_model_1 = __importDefault(require("../../payment/models/payment.model"));
const getDailyRevenue = async (date) => {
    const start = new Date(`${date}T00:00:00.000`);
    const end = new Date(`${date}T23:59:59.999`);
    return payment_model_1.default.aggregate([
        {
            $match: {
                isDeleted: false,
                createdAt: {
                    $gte: start,
                    $lte: end,
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
    const startDate = new Date(from);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(to);
    endDate.setHours(23, 59, 59, 999);
    return order_model_1.default.find({
        isDeleted: false,
        createdAt: {
            $gte: startDate,
            $lte: endDate,
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