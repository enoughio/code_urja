import express from "express";
const router = express.Router();

router.get("/", (req, res) => res.json({ message: "E-commerce Product List" }));
router.get("/:id", (req, res) => res.json({ message: "Single Product Data" }));

export default router;
