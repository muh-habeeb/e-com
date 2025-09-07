import express from "express";
import {
  createUser,
  loginUser,
  logOutCurrentUser,
  getAllUser,
  getCurrentUserProfile,
  updateCurrentUser,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userControllerss.js";
import {  authenticated,  authorizedAdmin} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticated, authorizedAdmin, getAllUser); //create & (see users admin) and middleware func to manage the user

router.post("/auth", loginUser); //login

router.post("/logout", logOutCurrentUser); //logout

router
  .route("/profile")
  .get(authenticated, getCurrentUserProfile)
  .put(authenticated, updateCurrentUser); //show current  user profile nad put is used to update if wanted

router
  .route("/:id")
  .delete(authenticated, authorizedAdmin, deleteUserById)
  .get(authenticated, authorizedAdmin, getUserById)
  .put(authenticated, authorizedAdmin, updateUserById);

export default router;
