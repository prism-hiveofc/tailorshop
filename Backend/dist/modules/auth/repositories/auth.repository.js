"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.createUser = exports.findUserByPhone = exports.findUserByEmail = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const findUserByEmail = async (email) => {
    return await user_model_1.default.findOne({ email });
};
exports.findUserByEmail = findUserByEmail;
const findUserByPhone = async (phone) => {
    return await user_model_1.default.findOne({ phone });
};
exports.findUserByPhone = findUserByPhone;
const createUser = async (data) => {
    return await user_model_1.default.create(data);
};
exports.createUser = createUser;
const findUserById = async (userId) => {
    return user_model_1.default.findById(userId).select("-password");
};
exports.findUserById = findUserById;
//# sourceMappingURL=auth.repository.js.map