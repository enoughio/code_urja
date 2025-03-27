"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function AboutForm({ formData = {}, updateFormData }) {
  const [activeSection, setActiveSection] = useState("hero")

  const sections = [
    { id: "hero", name: "Hero Section" },
    { id: "mission", name: "Mission Section" },
    { id: "vision", name: "Vision Section" },
    { id: "team", name: "Team Section" },
  ]

  const handleSubmitSection = async (e, section) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sectionData = Object.fromEntries(formData.entries())

    try {
      // Send data to API
      const response = await fetch(`/api/cms/about/${section}`, {
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

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Hero Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "mission" && (
        <form onSubmit={(e) => handleSubmitSection(e, "mission")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mission Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.mission?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mission Statement</label>
              <textarea
                name="statement"
                defaultValue={formData.mission?.statement || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mission Image URL</label>
              <input
                type="text"
                name="image"
                defaultValue={formData.mission?.image || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Mission Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "vision" && (
        <form onSubmit={(e) => handleSubmitSection(e, "vision")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vision Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.vision?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vision Statement</label>
              <textarea
                name="statement"
                defaultValue={formData.vision?.statement || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vision Image URL</label>
              <input
                type="text"
                name="image"
                defaultValue={formData.vision?.image || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Vision Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "team" && (
        <form onSubmit={(e) => handleSubmitSection(e, "team")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Team Section Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.team?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Team Description</label>
              <textarea
                name="description"
                defaultValue={formData.team?.description || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="3"
              />
            </div>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border p-4 rounded">
                <h3 className="font-medium mb-2">Team Member {num}</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    name={`member${num}Name`}
                    placeholder="Name"
                    defaultValue={formData.team?.[`member${num}Name`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`member${num}Position`}
                    placeholder="Position"
                    defaultValue={formData.team?.[`member${num}Position`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`member${num}Image`}
                    placeholder="Image URL"
                    defaultValue={formData.team?.[`member${num}Image`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <textarea
                    name={`member${num}Bio`}
                    placeholder="Bio"
                    defaultValue={formData.team?.[`member${num}Bio`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                    rows="2"
                  />
                </div>
              </div>
            ))}

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Team Section
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

