"use client"

import { useState } from "react"
import { X } from "lucide-react"

// Import form components
import HomeForm from "./forms/home-form"
import AboutForm from "./forms/about-form"
import ContactForm from "./forms/contact-form"
import BlogForm from "./forms/blog-form"
import EcommerceForm from "./forms/ecommerce-form"
import NavFooterForm from "./forms/nav-footer-form"

export default function EditModal({ section, page, formData, onClose, onSave }) {
  const [localFormData, setLocalFormData] = useState(formData || {})

  // Map page and section to the correct form component
  const getFormComponent = () => {
    switch (page) {
      case "home":
        return (
          <HomeForm
            formData={{ [section]: localFormData }}
            updateFormData={(data) => setLocalFormData((prev) => ({ ...prev, ...data[section] }))}
            activeSection={section}
          />
        )
      case "about":
        return (
          <AboutForm
            formData={{ [section]: localFormData }}
            updateFormData={(data) => setLocalFormData((prev) => ({ ...prev, ...data[section] }))}
            activeSection={section}
          />
        )
      case "contact":
        return (
          <ContactForm
            formData={{ [section]: localFormData }}
            updateFormData={(data) => setLocalFormData((prev) => ({ ...prev, ...data[section] }))}
            activeSection={section}
          />
        )
      case "blog":
        return (
          <BlogForm
            formData={{ [section]: localFormData }}
            updateFormData={(data) => setLocalFormData((prev) => ({ ...prev, ...data[section] }))}
            activeSection={section}
          />
        )
      case "ecommerce":
        return (
          <EcommerceForm
            formData={{ [section]: localFormData }}
            updateFormData={(data) => setLocalFormData((prev) => ({ ...prev, ...data[section] }))}
            activeSection={section}
          />
        )
      case "navFooter":
        return (
          <NavFooterForm
            formData={{ [section]: localFormData }}
            updateFormData={(data) => setLocalFormData((prev) => ({ ...prev, ...data[section] }))}
            activeSection={section}
          />
        )
      default:
        return <div>Form not found</div>
    }
  }

  const handleSave = () => {
    onSave(localFormData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit {section} Section</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {getFormComponent()}

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

