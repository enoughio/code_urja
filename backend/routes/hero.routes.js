import express from "express";

import { getHeroSection, deleteHomePage, getFooterSection, getWhyChooseUsSection, getFAQSection} from "../controllers/homeController.js";
// import { deleteHomePage } from "../controllers/homeController.js";

const router = express.Router();



// router.get("/footer", (req, res) => res.json({ message: "Footer Section Data" }));

// router.put("/update/hero", updateHeroSection);
// router.put("/update/whychoseus", updateWhyChooseUsSection);
// router.put("/update/faq", updateFAQSection);
// router.put("/update/footer", updateFooterSection);




router.delete("/delete/:id", deleteHomePage);

export default router;
