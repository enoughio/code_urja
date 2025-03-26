import Contact from "../models/Contact.js";

export const sendEnquiry = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newEnquiry = new Contact({ name, email, message });
        await newEnquiry.save();
        res.json({ message: "Enquiry saved successfully!", data: newEnquiry });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
