import About from "../models/About.js";

export const updateAboutPage = async (req, res) => {
    try {
        const { mission, vision, team } = req.body;
        const aboutData = await About.findOneAndUpdate({}, { mission, vision, team }, { upsert: true, new: true });
        res.json({ message: "About page updated!", data: aboutData });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

