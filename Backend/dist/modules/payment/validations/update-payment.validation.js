"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updatePaymentValidation = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
    paymentMethod: joi_1.default.string()
        .valid("CASH", "UPI", "CARD", "BANK")
        .required(),
    remarks: joi_1.default.string()
        .allow("")
        .required(),
});
//# sourceMappingURL=update-payment.validation.js.map