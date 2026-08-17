"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPaymentValidation = joi_1.default.object({
    orderId: joi_1.default.string().required(),
    amount: joi_1.default.number()
        .positive()
        .required(),
    paymentMethod: joi_1.default.string()
        .valid("CASH", "UPI", "CARD", "BANK")
        .required(),
    remarks: joi_1.default.string()
        .allow("")
        .required(),
});
//# sourceMappingURL=create-payment.validation.js.map