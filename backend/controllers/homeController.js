import Home from "../models/Home.js";

export const updateHomePage = async (req, res) => {
    try {
        const { heroText, whyChooseUs, faqs, footer } = req.body;
        const homeData = await Home.findOneAndUpdate({}, { heroText, whyChooseUs, faqs, footer }, { upsert: true, new: true });
        res.json({ message: "Home page updated!", data: homeData });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
