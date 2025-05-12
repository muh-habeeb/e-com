import express from "express";
const router = express.Router();

import {
  authenticated,
  authorizedAdmin,
} from "../middlewares/authMiddleWare.js";
import {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  listCategory,
} from "../controllers/categoryController.js";

//root of category
router.route("/").post(authenticated, authorizedAdmin, createCategory);
// root of category/categories  for all categories
router.route("/categories").get(listCategory);

// methods by id
router
  .route("/:categoryId")
  .get(readCategory)
  .put(authenticated, authorizedAdmin, updateCategory)
  .delete(authenticated, authorizedAdmin, deleteCategory);

export default router;
