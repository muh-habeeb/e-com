import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//utils

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
dotenv.config();
const port = process.env.PORT || 9999;
//connect datable
connectDB();

//middlewares and instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/// routes
app.use("/api/users", userRoutes); //importing from routes for post method
app.use("/api/category", categoryRoutes);

app.listen(port, () => console.log(`Server running on PORT ${port}`));
