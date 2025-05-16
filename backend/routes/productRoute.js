import express from "express";
import formidable from "express-formidable";
const router = express.Router();
import {
  authenticated,
  authorizedAdmin,
} from "../middlewares/authMiddleWare.js";

import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProduct,
  fetchProductById,
  fetchAllProduct,
  addProductReview,
} from "../controllers/productController.js";

import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProduct)
  .post(authenticated, authorizedAdmin, formidable(), addProduct); //what  is formidable
router.route("/allproducts").get(fetchAllProduct);

router
  .route("/:id/reviews")
  .post(authenticated, authorizedAdmin, addProductReview);

router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticated, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticated, authorizedAdmin, removeProduct);
export default router;
