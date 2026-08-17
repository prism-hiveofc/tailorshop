"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerValidation = joi_1.default.object({
    name: joi_1.default.string().trim().min(3).max(50).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    password: joi_1.default.string().min(6).max(20).required(),
});
//# sourceMappingURL=register.validation.js.map