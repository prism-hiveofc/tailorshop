"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletePayment = exports.searchPayments = exports.getPaymentsByOrder = exports.updatePayment = exports.findPaymentById = exports.listPayments = exports.createPayment = void 0;
const payment_model_1 = __importDefault(require("../models/payment.model"));
const createPayment = async (data) => {
    return payment_model_1.default.create(data);
};
exports.createPayment = createPayment;
const listPayments = async () => {
    return payment_model_1.default.find({
        isDeleted: false,
    })
        .populate("orderId", "orderNumber balanceAmount")
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.listPayments = listPayments;
const findPaymentById = async (paymentId) => {
    return payment_model_1.default.findOne({
        _id: paymentId,
        isDeleted: false,
    })
        .populate("orderId", "orderNumber balanceAmount")
        .select("-__v");
};
exports.findPaymentById = findPaymentById;
const updatePayment = async (paymentId, data) => {
    return payment_model_1.default.findOneAndUpdate({
        _id: paymentId,
        isDeleted: false,
    }, data, {
        new: true,
        runValidators: true,
    })
        .populate("orderId", "orderNumber balanceAmount")
        .select("-__v");
};
exports.updatePayment = updatePayment;
const getPaymentsByOrder = async (orderId) => {
    return payment_model_1.default.find({
        orderId,
        isDeleted: false,
    });
};
exports.getPaymentsByOrder = getPaymentsByOrder;
const searchPayments = async (keyword) => {
    return payment_model_1.default.find({
        isDeleted: false,
        paymentMethod: {
            $regex: keyword,
            $options: "i",
        },
    })
        .populate("orderId", "orderNumber balanceAmount")
        .select("-__v");
};
exports.searchPayments = searchPayments;
const softDeletePayment = async (paymentId, userId) => {
    console.log("DELETE ID:", paymentId);
    console.log("USER ID:", userId);
    const existingPayment = await payment_model_1.default.findOne({
        _id: paymentId,
    });
    console.log("EXISTING PAYMENT:", existingPayment);
    const deletedPayment = await payment_model_1.default.findOneAndUpdate({
        _id: paymentId,
        isDeleted: false,
    }, {
        isDeleted: true,
        deletedAt: new Date(),
        updatedBy: userId,
    }, {
        returnDocument: "after",
    });
    console.log("UPDATED PAYMENT:", deletedPayment);
    return deletedPayment;
};
exports.softDeletePayment = softDeletePayment;
//# sourceMappingURL=payment.repository.js.map