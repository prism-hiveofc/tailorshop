import { Router } from "express";

import {
  registerController,
  loginController,
  logoutController,
  getProfileController,
} from "../controllers/auth.controller";

import { authMiddleware } from "../../../shared/middleware/auth.middleware";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get(
  "/me",
  authMiddleware,
  getProfileController
);

router.post(
  "/logout",
  logoutController
);

export default router;