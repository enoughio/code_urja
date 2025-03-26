import express from "express";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/add", createProduct);

export default router;