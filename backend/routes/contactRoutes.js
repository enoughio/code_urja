import express from "express";
import { sendEnquiry, updateContact, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/enquiry", sendEnquiry);  // Create
router.put("/update/:id", updateContact);  // Update
router.delete("/delete/:id", deleteContact);  // Delete
router.get("/address", (req, res) => res.json({ message: "Address Data" }));
router.post("/enquiry", sendEnquiry);
router.get("/footer", (req, res) => res.json({ message: "Footer Section Data" }));

export default router;