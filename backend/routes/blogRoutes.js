import express from "express";

import { createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Blog List" }));
router.get("/:id", (req, res) => res.json({ message: "Single Blog Data" }));
router.post("/create", createBlog);
router.put("/update/:id", updateBlog);  
router.delete("/delete/:id", deleteBlog);


export default router;
