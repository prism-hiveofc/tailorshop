"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = (response, message, data, statusCode = 200) => {
    response.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.successResponse = successResponse;
//# sourceMappingURL=success.response.js.map