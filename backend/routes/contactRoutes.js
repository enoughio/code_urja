import express from "express";

import { sendEnquiry } from "../controllers/contactController.js";


const router = express.Router();

router.get("/address", (req, res) => res.json({ message: "Address Data" }));
router.post("/enquiry", sendEnquiry);
router.get("/footer", (req, res) => res.json({ message: "Footer Section Data" }));

export default router;
