import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
//utils

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import uploadRouts from "./routes/uploadRoutes.js";
import orderRoute from "./routes/orderRoute.js";

dotenv.config();
const port = process.env.PORT || 9999;
//connect datable
connectDB();

//middlewares and instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logMessage); // custom logger middleware
/// routes
app.use("/api/users", userRoutes); //importing from routes for post method
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRouts);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoutes);
// +++++++++++++++++++++++++++++++++++

import paymentRoutes from "./routes/paymentRoutes.js";
import logMessage from "./log.js";
app.use("/api/payment", paymentRoutes);

// +++++++++++++++++++++++++++++++++++

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.listen(port, () => console.log(`Server running on PORT ${port}`));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
