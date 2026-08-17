"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const errorResponse = (response, message, statusCode = 500) => {
    response.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=error.response.js.map