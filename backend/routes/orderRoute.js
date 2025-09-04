import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import {
  authenticated,
  authorizedAdmin,
} from "../middlewares/authMiddleware.js";

import {
  createOrder,
  getAllOrders,
  getUserOrder,
  findOrderById,
  total_order_count,
  calculateTotalSales,
  calculateTotalSalesBYDate,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../controllers/orderController.js";
router
  .route("/")
  .post(authenticated, createOrder)
  .get(authenticated, authorizedAdmin, getAllOrders);

router.route("/mine").get(authenticated, getUserOrder);
router.route("/total-orders").get(total_order_count);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesBYDate);
router.route("/:id").get(authenticated, findOrderById);
router.route("/:id/pay").put(authenticated, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authenticated, authorizedAdmin, markOrderAsDelivered);
export default router;
