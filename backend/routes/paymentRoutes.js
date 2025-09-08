import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/paymentController.js";
import {
  authenticated,
  authorizedAdmin,
} from "../middlewares/authMiddleWare.js";
import { paymentLogger } from "../middlewares/paymentLogger.js";
import { exportPayments } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/razorpay-order", authenticated, createRazorpayOrder);
router.post(
  "/razorpay-verify",
  authenticated,
  paymentLogger,
  verifyRazorpayPayment,
);
// Only admins can view/export payments
router.get("/", authenticated, authorizedAdmin, exportPayments);
export default router;
