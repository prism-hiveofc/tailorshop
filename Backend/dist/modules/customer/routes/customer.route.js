"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_controller_1 = require("../controllers/customer.controller");
const auth_middleware_1 = require("../../../shared/middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authMiddleware, customer_controller_1.createCustomerController);
router.get("/search", auth_middleware_1.authMiddleware, customer_controller_1.searchCustomerController);
router.get("/", auth_middleware_1.authMiddleware, customer_controller_1.listCustomersController);
router.get("/:id", auth_middleware_1.authMiddleware, customer_controller_1.getCustomerController);
router.put("/:id", auth_middleware_1.authMiddleware, customer_controller_1.updateCustomerController);
router.post("/:id", auth_middleware_1.authMiddleware, customer_controller_1.deleteCustomerController);
exports.default = router;
//# sourceMappingURL=customer.route.js.map