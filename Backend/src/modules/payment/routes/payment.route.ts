import { Router } from "express";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

import { createPaymentController, deletePaymentController, getPaymentController, listPaymentsController, searchPaymentController, updatePaymentController } from "../controllers/payment.controller";

const router = Router();
router.post("/", authMiddleware, createPaymentController);

router.get("/", authMiddleware, listPaymentsController);

router.get("/search", authMiddleware, searchPaymentController);

router.get("/:id", authMiddleware, getPaymentController);
router.put( "/:id", authMiddleware, updatePaymentController );

router.delete( "/:id", authMiddleware, deletePaymentController);

export default router;