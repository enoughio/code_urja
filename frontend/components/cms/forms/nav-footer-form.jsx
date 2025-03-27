"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast" 

export default function NavFooterForm({ formData = {}, updateFormData }) {
  const [activeSection, setActiveSection] = useState("navigation")

  const sections = [
    { id: "navigation", name: "Navigation" },
    { id: "footer", name: "Footer" },
  ]

  const handleSubmitSection = async (e, section) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sectionData = Object.fromEntries(formData.entries())

    try {
      // Send data to API
      const response = await fetch(`/api/cms/navFooter/${section}`, {
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

      {activeSection === "navigation" && (
        <form onSubmit={(e) => handleSubmitSection(e, "navigation")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Website Name/Logo</label>
              <input
                type="text"
                name="siteName"
                defaultValue={formData.navigation?.siteName || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Logo URL (optional)</label>
              <input
                type="text"
                name="logoUrl"
                defaultValue={formData.navigation?.logoUrl || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Navigation Links</h3>

              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    name={`navLink${num}Text`}
                    placeholder={`Link ${num} Text`}
                    defaultValue={formData.navigation?.[`navLink${num}Text`] || ""}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`navLink${num}Url`}
                    placeholder={`Link ${num} URL`}
                    defaultValue={formData.navigation?.[`navLink${num}Url`] || ""}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Button Text (optional)</label>
              <input
                type="text"
                name="ctaText"
                defaultValue={formData.navigation?.ctaText || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Button URL</label>
              <input
                type="text"
                name="ctaUrl"
                defaultValue={formData.navigation?.ctaUrl || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Navigation
            </button>
          </div>
        </form>
      )}

      {activeSection === "footer" && (
        <form onSubmit={(e) => handleSubmitSection(e, "footer")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Footer Logo/Text</label>
              <input
                type="text"
                name="footerText"
                defaultValue={formData.footer?.footerText || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Footer Description</label>
              <textarea
                name="footerDescription"
                defaultValue={formData.footer?.footerDescription || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="3"
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Footer Column 1</h3>
              <input
                type="text"
                name="column1Title"
                placeholder="Column Title"
                defaultValue={formData.footer?.column1Title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-2"
              />

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    name={`column1Link${num}Text`}
                    placeholder={`Link ${num} Text`}
                    defaultValue={formData.footer?.[`column1Link${num}Text`] || ""}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`column1Link${num}Url`}
                    placeholder={`Link ${num} URL`}
                    defaultValue={formData.footer?.[`column1Link${num}Url`] || ""}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Footer Column 2</h3>
              <input
                type="text"
                name="column2Title"
                placeholder="Column Title"
                defaultValue={formData.footer?.column2Title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-2"
              />

              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    name={`column2Link${num}Text`}
                    placeholder={`Link ${num} Text`}
                    defaultValue={formData.footer?.[`column2Link${num}Text`] || ""}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                  <input
                    type="text"
                    name={`column2Link${num}Url`}
                    placeholder={`Link ${num} URL`}
                    defaultValue={formData.footer?.[`column2Link${num}Url`] || ""}
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Social Media Links</h3>

              {[
                { id: "facebook", name: "Facebook" },
                { id: "twitter", name: "Twitter" },
                { id: "instagram", name: "Instagram" },
                { id: "linkedin", name: "LinkedIn" },
                { id: "youtube", name: "YouTube" },
              ].map((social) => (
                <div key={social.id} className="mb-2">
                  <label className="block text-sm mb-1">{social.name} URL</label>
                  <input
                    type="text"
                    name={`${social.id}Url`}
                    defaultValue={formData.footer?.[`${social.id}Url`] || ""}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Copyright Text</label>
              <input
                type="text"
                name="copyrightText"
                defaultValue={formData.footer?.copyrightText || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Footer
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

