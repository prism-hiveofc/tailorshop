"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get("/test", (_req, res) => {
    res.json({
        success: true,
        message: "Auth Route Working",
    });
});
router.post("/register", auth_controller_1.registerController);
router.post("/login", auth_controller_1.loginController);
exports.default = router;
//# sourceMappingURL=auth.route.js.map