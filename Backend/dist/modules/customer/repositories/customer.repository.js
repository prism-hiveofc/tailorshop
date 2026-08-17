"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerExists = exports.searchCustomer = exports.softDeleteCustomer = exports.updateCustomer = exports.listCustomers = exports.findCustomerById = exports.createCustomer = exports.findCustomerByPhone = void 0;
const customer_model_1 = __importDefault(require("../models/customer.model"));
const findCustomerByPhone = async (phone) => {
    return customer_model_1.default.findOne({
        phone,
        isDeleted: false,
    });
};
exports.findCustomerByPhone = findCustomerByPhone;
const createCustomer = async (data) => {
    return customer_model_1.default.create(data);
};
exports.createCustomer = createCustomer;
const findCustomerById = async (customerId) => {
    return customer_model_1.default.findOne({
        _id: customerId,
        isDeleted: false,
    }).select("-__v");
};
exports.findCustomerById = findCustomerById;
const listCustomers = async () => {
    return customer_model_1.default.find({
        isDeleted: false,
    })
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.listCustomers = listCustomers;
const updateCustomer = async (customerId, data) => {
    return customer_model_1.default.findOneAndUpdate({
        _id: customerId,
        isDeleted: false,
    }, data, {
        new: true,
        runValidators: true,
    }).select("-__v");
};
exports.updateCustomer = updateCustomer;
const softDeleteCustomer = async (customerId, updatedBy) => {
    return customer_model_1.default.findOneAndUpdate({
        _id: customerId,
        isDeleted: false,
    }, {
        isDeleted: true,
        deletedAt: new Date(),
        updatedBy,
    }, {
        new: true,
    }).select("-__v");
};
exports.softDeleteCustomer = softDeleteCustomer;
const searchCustomer = async (keyword) => {
    return customer_model_1.default.find({
        isDeleted: false,
        $or: [
            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                phone: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ],
    })
        .select("-__v")
        .sort({
        createdAt: -1,
    });
};
exports.searchCustomer = searchCustomer;
const customerExists = async (customerId) => {
    return customer_model_1.default.findOne({
        _id: customerId,
        isDeleted: false,
    });
};
exports.customerExists = customerExists;
//# sourceMappingURL=customer.repository.js.map