"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateCustomerValidation = joi_1.default.object({
    name: joi_1.default.string().trim().required(),
    phone: joi_1.default.string().trim().required(),
    alternatePhone: joi_1.default.string()
        .trim()
        .allow("")
        .optional(),
    gender: joi_1.default.string()
        .valid("MALE", "FEMALE", "OTHER")
        .required(),
    address: joi_1.default.string()
        .trim()
        .required(),
});
//# sourceMappingURL=update-customer.validation.js.map