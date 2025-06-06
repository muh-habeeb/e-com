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
  fetchTopProducts,fetchNewProducts,
  filterProducts
} from "../controllers/productController.js";

import checkId from "../middlewares/checkId.js";

router.get("/top", fetchTopProducts); /// in top working in bottom not working
router.get("/new",fetchNewProducts);
router
  .route("/")
  .get(fetchProduct)
  .post(authenticated, authorizedAdmin, formidable(), addProduct); //what  is formidable
router.route("/allproducts").get(fetchAllProduct);

//review add
router
  .route("/:id/reviews")
  // .post(authenticated, authorizedAdmin,checkId, addProductReview);
  .post(authenticated,checkId, addProductReview);

// methods by using id
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticated, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticated, authorizedAdmin, removeProduct);
// top product



router.route('/filtered-products').post(filterProducts)
export default router;
