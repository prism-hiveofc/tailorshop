"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_helper_1 = require("../helpers.ts/jwt.helper");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "Authorization header missing",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token missing",
            });
            return;
        }
        const decoded = (0, jwt_helper_1.verifyToken)(token);
        req.user = {
            userId: decoded.userId,
            role: decoded.role
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