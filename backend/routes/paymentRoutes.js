import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";
import { authenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/razorpay-order", authenticated, createRazorpayOrder);
router.post("/razorpay-verify", authenticated, verifyRazorpayPayment);
export default router;
