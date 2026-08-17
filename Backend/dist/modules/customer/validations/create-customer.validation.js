"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createCustomerValidation = joi_1.default.object({
    name: joi_1.default.string()
        .trim()
        .min(3)
        .max(50)
        .required(),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    alternatePhone: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .allow("")
        .optional(),
    gender: joi_1.default.string()
        .valid("MALE", "FEMALE", "OTHER")
        .required(),
    address: joi_1.default.string()
        .trim()
        .max(200)
        .required(),
});
//# sourceMappingURL=create-customer.validation.js.map