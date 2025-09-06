// middleware/paymentLogger.js
import fs from "fs";
import path from "path";
import winston from "winston";

// Ensure logs directory exists inside backend folder
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Winston logger setup
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `
==============================
📅 Time:    ${timestamp}
🚀 Level:   ${level}
${message}
==============================`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, "payments.log") }),
    new winston.transports.Console(),
  ],
});

// Middleware
export const paymentLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const logData = `
🌐 URL:     ${req.originalUrl}
🚀 Method:  ${req.method}
👤 User:    ${req?.user?._id || "no user"}
📦 Body:    ${
      Object.keys(req.body || {}).length
        ? JSON.stringify(req.body, null, 2)
        : "No Body"
    }
📡 Status:  ${res.statusCode}
⏱️ Duration: ${Date.now() - start}ms`;

    logger.info(logData);
  });

  next();
};
