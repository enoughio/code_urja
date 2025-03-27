import express from "express";

import { updateAboutPage } from "../controllers/aboutController.js";
import { deleteAboutPage } from "../controllers/aboutController.js";

const router = express.Router();

router.get("/header", (req, res) => res.json({ message: "About Header Data" }));
router.get("/mission", (req, res) => res.json({ message: "Mission Section Data" }));
router.get("/vision", (req, res) => res.json({ message: "Vision Section Data" }));
router.get("/team", (req, res) => res.json({ message: "Team Section Data" }));

router.put("/update", updateAboutPage);
router.delete("/delete/:id", deleteAboutPage);

export default router;
