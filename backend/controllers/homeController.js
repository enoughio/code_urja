// import Home from "../models/Home.js";

// export const updateHomePage = async (req, res) => {
//     try {
//         const { heroText, whyChooseUs, faqs, footer } = req.body;
//         // const homeData = await Home.findOneAndUpdate({}, { heroText, whyChooseUs, faqs, footer }, { upsert: true, new: true });
//         // res.json({ message: "Home page updated!", data: homeData });

//         if (!hero || !whyChooseUs || !faqs || !footer) {
//             return res.status(400).json({ error: "Missing required fields" });
//           }
      
//           const home = await Home.findOne();
//           if (!home) {
//             return res.status(404).json({ error: "Home section not found" });
//           }
      
//           home.heroText = heroText;
//           home.whyChooseUs = whyChooseUs;
//           home.faqs = faqs;
//           home.footer = footer;
      
//           await home.save();
      
//           res.status(200).json({ message: "Home page updated successfully", home });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };


import Home from "../models/Home.js";

export const updateHomePage = async (req, res) => {
    try {
        const { heroText, whyChooseUs, faqs, footer } = req.body;

        // Validate required fields
        if (!heroText || !whyChooseUs || !faqs || !footer) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if Home data exists
        let home = await Home.findOne();
        
        if (!home) {
            // If no home data exists, create a new one
            home = new Home({ heroText, whyChooseUs, faqs, footer });
        } else {
            // Otherwise, update the existing one
            home.heroText = heroText;
            home.whyChooseUs = whyChooseUs;
            home.faqs = faqs;
            home.footer = footer;
        }

        // Save the updated/new data
        await home.save();

        res.status(200).json({ message: "Home page updated successfully", home });
    } catch (error) {
        console.error("Error updating home page:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const deleteHomePage = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from URL

        // Check if the document exists
        const home = await Home.findById(id);
        if (!home) {
            return res.status(404).json({ error: "Home section not found" });
        }

        // Delete the document
        await Home.findByIdAndDelete(id);

        res.status(200).json({ message: "Home section deleted successfully" });
    } catch (error) {
        console.error("Error deleting home section:", error);
        res.status(500).json({ error: "Server error" });
    }
};
