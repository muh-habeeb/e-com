// prepareUploadsFolder.js
import fs from "fs";
import path from "path"; // <-- Added this import
import { fileURLToPath } from "url"; // <-- Added this import

// Get currentDirectory equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(__filename); // <-- Changed 'dirname' to 'path.dirname'

const uploadPath = path.join(currentDirectory, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Created uploads folder");
} else {
  console.log("uploads folder already exists");
}