"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderBalance = exports.softDeleteOrder = exports.updateOrder = exports.findOrderById = exports.listOrders = exports.getLastOrder = exports.searchOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const createOrder = async (data) => {
    return order_model_1.default.create(data);
};
exports.createOrder = createOrder;
const searchOrders = async (keyword) => {
    return order_model_1.default.find({
        isDeleted: false,
        $or: [
            {
                orderNumber: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                dressType: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ],
    })
        .populate("customerId", "name phone")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.searchOrders = searchOrders;
const getLastOrder = async () => {
    return order_model_1.default.findOne()
        .sort({
        createdAt: -1,
    })
        .select("orderNumber");
};
exports.getLastOrder = getLastOrder;
const listOrders = async () => {
    return order_model_1.default.find({
        isDeleted: false,
    })
        .populate("customerId", "name phone")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.listOrders = listOrders;
const findOrderById = async (orderId) => {
    return order_model_1.default.findOne({
        _id: orderId,
        isDeleted: false,
    })
        .populate("customerId", "name phone")
        .select("-__v");
};
exports.findOrderById = findOrderById;
const updateOrder = async (orderId, data) => {
    return order_model_1.default.findOneAndUpdate({
        _id: orderId,
        isDeleted: false,
    }, data, {
        new: true,
        runValidators: true,
    })
        .populate("customerId", "name phone")
        .select("-__v");
};
exports.updateOrder = updateOrder;
const softDeleteOrder = async (orderId, userId) => {
    return order_model_1.default.findOneAndUpdate({
        _id: orderId,
        isDeleted: false,
    }, {
        isDeleted: true,
        deletedAt: new Date(),
        updatedBy: userId,
    }, {
        new: true,
    });
};
exports.softDeleteOrder = softDeleteOrder;
const updateOrderBalance = async (orderId, balanceAmount) => {
    return order_model_1.default.findByIdAndUpdate(orderId, {
        balanceAmount,
    }, {
        new: true,
    });
};
exports.updateOrderBalance = updateOrderBalance;
//# sourceMappingURL=order.repostories.js.map