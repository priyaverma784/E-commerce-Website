import express from "express";
import { SignupUser, LoginUser, getMe } from "../controller/AuthController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/login", LoginUser);
router.get("/me", verifyToken, getMe);

export default router;
