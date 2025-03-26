import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    heroText: String,
    whyChooseUs: [String],
    faqs: [String],
    footer: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model("Home", homeSchema);
