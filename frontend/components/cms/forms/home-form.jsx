"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function HomeForm({ formData = {}, updateFormData }) {
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    { id: "hero", name: "Hero Section" },
    { id: "whyChooseUs", name: "Why Choose Us" },
    { id: "faq", name: "FAQ Section" },
  ]

  const handleSubmitSection = async (e, section) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sectionData = Object.fromEntries(formData.entries())

    try {
      // Send data to API
      const response = await fetch(`/api/cms/home/${section}`, {
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
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input
                type="text"
                name="heading"
                defaultValue={formData.hero?.heading || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subheading</label>
              <input
                type="text"
                name="subheading"
                defaultValue={formData.hero?.subheading || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
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
              Save Hero Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "whyChooseUs" && (
        <form onSubmit={(e) => handleSubmitSection(e, "whyChooseUs")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.whyChooseUs?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Section Description</label>
              <textarea
                name="description"
                defaultValue={formData.whyChooseUs?.description || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="3"
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Reason 1</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  name="reason1Title"
                  placeholder="Title"
                  defaultValue={formData.whyChooseUs?.reason1Title || ""}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <textarea
                  name="reason1Description"
                  placeholder="Description"
                  defaultValue={formData.whyChooseUs?.reason1Description || ""}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows="2"
                />
              </div>
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Reason 2</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  name="reason2Title"
                  placeholder="Title"
                  defaultValue={formData.whyChooseUs?.reason2Title || ""}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <textarea
                  name="reason2Description"
                  placeholder="Description"
                  defaultValue={formData.whyChooseUs?.reason2Description || ""}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows="2"
                />
              </div>
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Reason 3</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  name="reason3Title"
                  placeholder="Title"
                  defaultValue={formData.whyChooseUs?.reason3Title || ""}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <textarea
                  name="reason3Description"
                  placeholder="Description"
                  defaultValue={formData.whyChooseUs?.reason3Description || ""}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  rows="2"
                />
              </div>
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Why Choose Us Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "faq" && (
        <form onSubmit={(e) => handleSubmitSection(e, "faq")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">FAQ Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.faq?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">FAQ Description</label>
              <textarea
                name="description"
                defaultValue={formData.faq?.description || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="2"
              />
            </div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border p-4 rounded">
                <h3 className="font-medium mb-2">FAQ {num}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    name={`question${num}`}
                    placeholder="Question"
                    defaultValue={formData.faq?.[`question${num}`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <textarea
                    name={`answer${num}`}
                    placeholder="Answer"
                    defaultValue={formData.faq?.[`answer${num}`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    rows="2"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save FAQ Section
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

