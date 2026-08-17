"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../shared/middleware/auth.middleware");
const payment_controller_1 = require("../controllers/payment.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, payment_controller_1.createPaymentController);
router.get("/", auth_middleware_1.authMiddleware, payment_controller_1.listPaymentsController);
router.get("/search", auth_middleware_1.authMiddleware, payment_controller_1.searchPaymentController);
router.get("/:id", auth_middleware_1.authMiddleware, payment_controller_1.getPaymentController);
router.put("/:id", auth_middleware_1.authMiddleware, payment_controller_1.updatePaymentController);
router.delete("/:id", auth_middleware_1.authMiddleware, payment_controller_1.deletePaymentController);
exports.default = router;
//# sourceMappingURL=payment.route.js.map