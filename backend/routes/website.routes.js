import express from "express";
import heroRoutes, {UpdateHome, getHomePage} from "./hero.routes.js";
// import aboutRoutes from "./about.routes.js";
// import contactRoutes from "./contact.routes.js";


const router = express.Router();

router.apply.get("/home", getHomePage)
router.post("/create/home", heroRoutes)
// router.get("/update/home", UpdateHome)
// router.get("/:tenetid/create/about", aboutRoutes)
// router.get("/:tenetid/create/contact", contactRoutes)

export default router;




