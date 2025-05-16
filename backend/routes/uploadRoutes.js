import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

router.post("/", (req, res) => {
  res.send("ok");
});

export default router;
