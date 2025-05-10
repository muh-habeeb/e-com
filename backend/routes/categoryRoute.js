import express from "express";
const router = express.Router();

import {authenticated,authorizedAdmin} from '../middlewares/authMiddleWare.js'
import { createCategory } from "../controllers/categoryController.js";

router.route("/").post(createCategory);

export default router;
