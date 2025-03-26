import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const newProduct = new Product({ name, description, price, category });
        await newProduct.save();
        res.json({ message: "Product saved successfully!", data: newProduct });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
