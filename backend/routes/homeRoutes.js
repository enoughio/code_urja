import express from "express";

import { updateHomePage } from "../controllers/homeController.js";
import { deleteHomePage } from "../controllers/homeController.js";

const router = express.Router();

router.get("/hero", (req, res) => res.json({ message: "Hero Section Data" }));
router.get("/why-choose-us", (req, res) => res.json({ message: "Why Choose Us Section Data" }));
router.get("/faq", (req, res) => res.json({ message: "FAQ Section Data" }));
router.get("/footer", (req, res) => res.json({ message: "Footer Section Data" }));

router.put("/update", updateHomePage);
router.delete("/delete/:id", deleteHomePage);

export default router;
