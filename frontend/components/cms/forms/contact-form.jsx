"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast" 

export default function ContactForm({ formData = {}, updateFormData }) {
  const [activeSection, setActiveSection] = useState("address")

  const sections = [
    { id: "address", name: "Address Section" },
    { id: "enquiry", name: "Enquiry Form" },
  ]

  const handleSubmitSection = async (e, section) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const sectionData = Object.fromEntries(formData.entries())

    try {
      // Send data to API
      const response = await fetch(`/api/cms/contact/${section}`, {
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

      {activeSection === "address" && (
        <form onSubmit={(e) => handleSubmitSection(e, "address")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Section Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.address?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                defaultValue={formData.address?.companyName || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                defaultValue={formData.address?.streetAddress || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City, State, Zip</label>
              <input
                type="text"
                name="cityStateZip"
                defaultValue={formData.address?.cityStateZip || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                defaultValue={formData.address?.country || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                defaultValue={formData.address?.phone || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={formData.address?.email || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Google Maps Embed URL</label>
              <input
                type="text"
                name="mapUrl"
                defaultValue={formData.address?.mapUrl || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Address Section
            </button>
          </div>
        </form>
      )}

      {activeSection === "enquiry" && (
        <form onSubmit={(e) => handleSubmitSection(e, "enquiry")}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Form Title</label>
              <input
                type="text"
                name="title"
                defaultValue={formData.enquiry?.title || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Form Description</label>
              <textarea
                name="description"
                defaultValue={formData.enquiry?.description || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Recipient Email</label>
              <input
                type="email"
                name="recipientEmail"
                defaultValue={formData.enquiry?.recipientEmail || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
                placeholder="Where enquiries will be sent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Success Message</label>
              <input
                type="text"
                name="successMessage"
                defaultValue={formData.enquiry?.successMessage || ""}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="Message shown after form submission"
              />
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Form Fields</h3>
              <p className="text-sm text-gray-500 mb-4">Configure which fields to show on the enquiry form</p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showName"
                    name="showName"
                    defaultChecked={formData.enquiry?.showName !== false}
                    className="mr-2"
                  />
                  <label htmlFor="showName">Name Field (required)</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showEmail"
                    name="showEmail"
                    defaultChecked={formData.enquiry?.showEmail !== false}
                    className="mr-2"
                  />
                  <label htmlFor="showEmail">Email Field (required)</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showPhone"
                    name="showPhone"
                    defaultChecked={formData.enquiry?.showPhone}
                    className="mr-2"
                  />
                  <label htmlFor="showPhone">Phone Field</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showSubject"
                    name="showSubject"
                    defaultChecked={formData.enquiry?.showSubject}
                    className="mr-2"
                  />
                  <label htmlFor="showSubject">Subject Field</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showMessage"
                    name="showMessage"
                    defaultChecked={formData.enquiry?.showMessage !== false}
                    className="mr-2"
                  />
                  <label htmlFor="showMessage">Message Field (required)</label>
                </div>
              </div>
            </div>

            <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              Save Enquiry Form
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

