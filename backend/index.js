
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//utils


import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

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

app.listen(port, () => console.log(`Server running on PORT ${port}`));



// node:internal/errors:496
//     ErrorCaptureStackTrace(err);
//     ^

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     at new NodeError (node:internal/errors:405:5)
//     at ServerResponse.setHeader (node:_http_outgoing:652:11)
//     at ServerResponse.header (C:\Users\NAIJIL\Desktop\LERNING\huxn dev\e_com\node_modules\express\lib\response.js:794:10)
//     at ServerResponse.send (C:\Users\NAIJIL\Desktop\LERNING\huxn dev\e_com\node_modules\express\lib\response.js:174:12)
//     at ServerResponse.json (C:\Users\NAIJIL\Desktop\LERNING\huxn dev\e_com\node_modules\express\lib\response.js:278:15)
//     at file:///C:/Users/NAIJIL/Desktop/LERNING/huxn%20dev/e_com/backend/middlewares/asyncHandler.js:3:21
//     at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
//   code: 'ERR_HTTP_HEADERS_SENT'
// }

// Node.js v20.4.0
// [nodemon] app crashed - waiting for file changes before starting...

// when user already exist msg
