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
} from "../controllers/productController.js";

import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .post(authenticated, authorizedAdmin, formidable(), addProduct); //what  is formidable
router
  .route("/:id")
  .put(authenticated, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticated, authorizedAdmin, removeProduct);
export default router;
