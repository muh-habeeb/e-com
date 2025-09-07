// prepareUploadsFolder.js
import fs from "fs";
import path from "path"; // <-- Added this import
import { fileURLToPath } from "url"; // <-- Added this import

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // <-- Changed 'dirname' to 'path.dirname'

const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Created uploads folder");
} else {
  console.log("uploads folder already exists");
}