"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardOverview = void 0;
const customer_model_1 = __importDefault(require("../../customer/models/customer.model"));
const order_model_1 = __importDefault(require("../../order/models/order.model"));
const payment_model_1 = __importDefault(require("../../payment/models/payment.model"));
const getDashboardOverview = async () => {
    const totalCustomers = await customer_model_1.default.countDocuments({
        isDeleted: false
    });
    const totalOrders = await order_model_1.default.countDocuments({
        isDeleted: false
    });
    const totalPayments = await payment_model_1.default.countDocuments({
        isDeleted: false
    });
    const pendingOrders = await order_model_1.default.countDocuments({
        status: "PENDING",
        isDeleted: false
    });
    const completedOrders = await order_model_1.default.countDocuments({
        status: "DELIVERED",
        isDeleted: false
    });
    const revenue = await payment_model_1.default.aggregate([
        {
            $match: {
                isDeleted: false
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$amount"
                }
            }
        }
    ]);
    return {
        totalCustomers,
        totalOrders,
        totalPayments,
        pendingOrders,
        completedOrders,
        totalRevenue: revenue[0]?.total || 0
    };
};
exports.getDashboardOverview = getDashboardOverview;
//# sourceMappingURL=dashboard.repository.js.map