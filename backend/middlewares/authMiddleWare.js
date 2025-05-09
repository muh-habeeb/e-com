import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticated = asyncHandler(async (req, res, next) => {
  //read JWT from the jwt cookie

  let token;
  token = req.cookies.jwt; //get token from the request
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET); //decode the jwt secret with verify func with JWT_SECRET and token which wil be  mongo OBJ _id
      //######   WHAT IS THE LINE -PASS
      req.user = await User.findById(decode.userId).select("-password"); //match the decoded value with  OBJ _id and password the user to next function whichever is it they can use eg : in controllers
      //all okay go to next function which is check is the users is admin or not
      next();
    } catch (error) {
      //throw errors
      res.status(401);
      throw new Error("Not authorized, token failed  ");
    }
  } else {
    //no token is found show this error
    res.status(401);
    throw new Error("Not authorized ,no token ");
  }
});

//check for the user is admin
const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    //check  user is present and the user is admin
    //if the user is admin goto next function which will be  getAllUsers() from controllers.js
    next();
  } else {
    //not admin show error
    res
      .status(401)
      .json({ request: "success", message: "Not authorized as admin." });
  }
};
//export these fiction to use in route files
export { authenticated, authorizedAdmin };
