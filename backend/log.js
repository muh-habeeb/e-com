// middleware/logger.js
const logMessage = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const body = Object.keys(req.body || {}).length ? JSON.stringify(req.body) : "No Body";
  const user = req.user?._id || "Guest";

  console.log(`
===============================
  📅 Time:    ${timestamp}
  🚀 Method:  ${method}
  🌐 URL:     ${url}
  👤 User:    ${user}
  📦 Body:    ${body}
===============================
  `);

  next();
};

export default logMessage;
