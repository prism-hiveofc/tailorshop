"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_helper_1 = require("../helpers.ts/jwt.helper");
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }
        const decoded = (0, jwt_helper_1.verifyToken)(token);
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map