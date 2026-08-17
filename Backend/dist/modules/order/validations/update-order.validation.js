"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.updateOrderValidation = joi_1.default.object({
    customerId: joi_1.default.string().required(),
    deliveryDate: joi_1.default.date().required(),
    dressType: joi_1.default.string()
        .trim()
        .required(),
    quantity: joi_1.default.number()
        .integer()
        .min(1)
        .required(),
    totalAmount: joi_1.default.number()
        .min(0)
        .required(),
    advanceAmount: joi_1.default.number()
        .min(0)
        .required(),
    remarks: joi_1.default.string()
        .allow("")
        .required(),
    status: joi_1.default.string()
        .valid("PENDING", "CUTTING", "STITCHING", "READY", "DELIVERED")
        .required(),
});
//# sourceMappingURL=update-order.validation.js.map