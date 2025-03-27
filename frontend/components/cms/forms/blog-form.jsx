"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast" 

export default function BlogForm({ formData = {}, updateFormData }) {
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    { id: "hero", name: "Hero Section" },
    { id: "blogs", name: "Blog Cards" },
  ]

  const handleSubmitSection = async (e, section) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sectionData = Object.fromEntries(formData.entries())

    try {
      // Send data to API
      const response = await fetch(`/api/cms/blog/${section}`, {
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
              <label className="block text-sm font-medium mb-1">Blog Page Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.hero?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Blog Page Description</label>
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

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Blog Hero Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "blogs" && (
        <form onSubmit={(e) => handleSubmitSection(e, "blogs")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Blog Section Title</label>
              <input
                type="text"
                name="sectionTitle"
                defaultValue={formData.blogs?.sectionTitle || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Blog Section Description</label>
              <textarea
                name="sectionDescription"
                defaultValue={formData.blogs?.sectionDescription || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="2"
              />
            </div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border p-4 rounded">
                <h3 className="font-medium mb-2">Blog {num}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    name={`blog${num}Title`}
                    placeholder="Title"
                    defaultValue={formData.blogs?.[`blog${num}Title`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <textarea
                    name={`blog${num}Excerpt`}
                    placeholder="Excerpt"
                    defaultValue={formData.blogs?.[`blog${num}Excerpt`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    rows="2"
                  />
                  <input
                    type="text"
                    name={`blog${num}Image`}
                    placeholder="Image URL"
                    defaultValue={formData.blogs?.[`blog${num}Image`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`blog${num}Author`}
                    placeholder="Author"
                    defaultValue={formData.blogs?.[`blog${num}Author`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="date"
                    name={`blog${num}Date`}
                    defaultValue={formData.blogs?.[`blog${num}Date`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`blog${num}Slug`}
                    placeholder="URL Slug (e.g., my-blog-post)"
                    defaultValue={formData.blogs?.[`blog${num}Slug`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Blog Cards
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

