"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

// Form steps for different pages
import HomeForm from "./forms/home-form"
import AboutForm from "./forms/about-form"
import ContactForm from "./forms/contact-form"
import BlogForm from "./forms/blog-form"
import EcommerceForm from "./forms/ecommerce-form"
import NavFooterForm from "./forms/nav-footer-form"

export default function CreateForm({ onClose }) {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    home: {},
    about: {},
    contact: {},
    blog: {},
    ecommerce: {},
    navFooter: {},
  })

  const steps = [
    { name: "Navigation & Footer", component: NavFooterForm },
    { name: "Home Page", component: HomeForm },
    { name: "About Page", component: AboutForm },
    { name: "Contact Page", component: ContactForm },
    { name: "Blog Page", component: BlogForm },
    { name: "E-commerce Page", component: EcommerceForm },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      // Go to preview when all steps are completed
      router.push("/cms/preview")
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const updateFormData = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }))

    // Store in localStorage to persist between page navigations
    localStorage.setItem(
      "cmsFormData",
      JSON.stringify({
        ...formData,
        [section]: {
          ...formData[section],
          ...data,
        },
      }),
    )
  }

  const CurrentStepComponent = steps[step].component

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Create Website Content - {steps[step].name}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((s, i) => (
                <div key={i} className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i < step
                        ? "bg-green-500 text-white"
                        : i === step
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {i < step ? "✓" : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${i < step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`${i === 0 ? "text-left" : i === steps.length - 1 ? "text-right" : "text-center"}`}
                >
                  {s.name}
                </div>
              ))}
            </div>
          </div>

          <CurrentStepComponent
            formData={formData[steps[step].name.toLowerCase().replace(" page", "").replace(" & ", "")]}
            updateFormData={(data) =>
              updateFormData(steps[step].name.toLowerCase().replace(" page", "").replace(" & ", ""), data)
            }
          />

          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={step === 0}
              className={`px-4 py-2 rounded ${
                step === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600 text-white"
              }`}
            >
              Previous
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              {step === steps.length - 1 ? "Preview" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

