import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.json({ message: "Blog saved successfully!", data: newBlog });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
