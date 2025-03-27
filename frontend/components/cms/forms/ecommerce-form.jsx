"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast" 

export default function EcommerceForm({ formData = {}, updateFormData }) {
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    { id: "hero", name: "Hero Section" },
    { id: "featured", name: "Featured Products" },
    { id: "categories", name: "Product Categories" },
  ]

  const handleSubmitSection = async (e, section) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sectionData = Object.fromEntries(formData.entries())

    try {
      // Send data to API
      const response = await fetch(`/api/cms/ecommerce/${section}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      })

      if (!response.ok) throw new Error("Failed to save section")

      const data = await response.json()

      // Update local state
      updateFormData({ [section]: data })

      toast({
        title: "Success",
        description: `${section} section saved successfully`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex border-b">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 ${
                activeSection === section.id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {activeSection === "hero" && (
        <form onSubmit={(e) => handleSubmitSection(e, "hero")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Shop Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.hero?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Shop Description</label>
              <textarea
                name="description"
                defaultValue={formData.hero?.description || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Background Image URL</label>
              <input
                type="text"
                name="backgroundImage"
                defaultValue={formData.hero?.backgroundImage || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Button Text</label>
              <input
                type="text"
                name="ctaText"
                defaultValue={formData.hero?.ctaText || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Button Link</label>
              <input
                type="text"
                name="ctaLink"
                defaultValue={formData.hero?.ctaLink || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Shop Hero Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "featured" && (
        <form onSubmit={(e) => handleSubmitSection(e, "featured")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Products Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.featured?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Featured Products Description</label>
              <textarea
                name="description"
                defaultValue={formData.featured?.description || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="2"
              />
            </div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border p-4 rounded">
                <h3 className="font-medium mb-2">Product {num}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    name={`product${num}Name`}
                    placeholder="Product Name"
                    defaultValue={formData.featured?.[`product${num}Name`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <textarea
                    name={`product${num}Description`}
                    placeholder="Description"
                    defaultValue={formData.featured?.[`product${num}Description`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    rows="2"
                  />
                  <input
                    type="text"
                    name={`product${num}Image`}
                    placeholder="Image URL"
                    defaultValue={formData.featured?.[`product${num}Image`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="number"
                    name={`product${num}Price`}
                    placeholder="Price"
                    defaultValue={formData.featured?.[`product${num}Price`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    step="0.01"
                  />
                  <input
                    type="number"
                    name={`product${num}DiscountPrice`}
                    placeholder="Discount Price (optional)"
                    defaultValue={formData.featured?.[`product${num}DiscountPrice`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    step="0.01"
                  />
                  <input
                    type="text"
                    name={`product${num}Slug`}
                    placeholder="URL Slug (e.g., product-name)"
                    defaultValue={formData.featured?.[`product${num}Slug`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Featured Products
            </button>
          </div>
        </form>
      )}

      {activeSection === "categories" && (
        <form onSubmit={(e) => handleSubmitSection(e, "categories")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Categories Section Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.categories?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border p-4 rounded">
                <h3 className="font-medium mb-2">Category {num}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    name={`category${num}Name`}
                    placeholder="Category Name"
                    defaultValue={formData.categories?.[`category${num}Name`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`category${num}Image`}
                    placeholder="Image URL"
                    defaultValue={formData.categories?.[`category${num}Image`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`category${num}Slug`}
                    placeholder="URL Slug (e.g., category-name)"
                    defaultValue={formData.categories?.[`category${num}Slug`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="number"
                    name={`category${num}ProductCount`}
                    placeholder="Product Count"
                    defaultValue={formData.categories?.[`category${num}ProductCount`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Categories
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

