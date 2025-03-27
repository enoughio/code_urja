"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Edit, Check } from "lucide-react"
import EditModal from "@/components/cms/edit-modal"
import { useToast } from "@/components/ui/use-toast"

export default function PreviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editSection, setEditSection] = useState(null)
  const [editPage, setEditPage] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    // Load form data from localStorage
    const savedData = localStorage.getItem("cmsFormData")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
    setLoading(false)
  }, [])

  const handleFinish = () => {
    // Here you would typically send all data to your backend
    // to finalize the website creation

    // For now, we'll just redirect back to the CMS dashboard
    router.push("/cms")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">No preview data available</h1>
        <p className="text-gray-500 mb-6">Please go back and complete the form to see a preview</p>
        <button
          onClick={() => router.push("/cms")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to CMS
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Preview Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Website Preview</h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleFinish}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
            >
              <Check size={18} />
              Finish
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Preview */}
      <div className="relative group border-b border-gray-200 dark:border-gray-700">
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              setEditPage("navFooter")
              setEditSection("navigation")
            }}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <Edit size={16} />
          </button>
        </div>

        <nav className="bg-white dark:bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="font-bold text-xl">{formData.navFooter?.navigation?.siteName || "Website Name"}</div>
            <div className="hidden md:flex space-x-6">
              {[1, 2, 3, 4, 5].map((num) => {
                const linkText = formData.navFooter?.navigation?.[`navLink${num}Text`]
                const linkUrl = formData.navFooter?.navigation?.[`navLink${num}Url`]

                if (!linkText) return null

                return (
                  <a
                    key={num}
                    href={linkUrl || "#"}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
                  >
                    {linkText}
                  </a>
                )
              })}
            </div>
            {formData.navFooter?.navigation?.ctaText && (
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {formData.navFooter.navigation.ctaText}
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Home Page Preview */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Home Page Preview</h2>

          {/* Hero Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("home")
                  setEditSection("hero")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{formData.home?.hero?.heading || "Welcome to Our Website"}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {formData.home?.hero?.subheading || "This is a placeholder for your hero subheading"}
                </p>
                {formData.home?.hero?.ctaText && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {formData.home.hero.ctaText}
                  </button>
                )}
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                {formData.home?.hero?.backgroundImage ? (
                  <img
                    src={formData.home.hero.backgroundImage || "/placeholder.svg"}
                    alt="Hero"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Hero Image Placeholder</span>
                )}
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("home")
                  setEditSection("whyChooseUs")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Why Choose Us Section</h3>
            <h2 className="text-2xl font-bold mb-2">{formData.home?.whyChooseUs?.title || "Why Choose Us"}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {formData.home?.whyChooseUs?.description || "This is a placeholder for your why choose us description"}
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                  <h3 className="font-bold mb-2">
                    {formData.home?.whyChooseUs?.[`reason${num}Title`] || `Reason ${num}`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {formData.home?.whyChooseUs?.[`reason${num}Description`] || "Description placeholder"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="relative group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("home")
                  setEditSection("faq")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">FAQ Section</h3>
            <h2 className="text-2xl font-bold mb-2">{formData.home?.faq?.title || "Frequently Asked Questions"}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {formData.home?.faq?.description || "This is a placeholder for your FAQ description"}
            </p>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((num) => {
                if (!formData.home?.faq?.[`question${num}`]) return null

                return (
                  <div key={num} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <h3 className="font-bold mb-2">{formData.home?.faq?.[`question${num}`] || `Question ${num}`}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {formData.home?.faq?.[`answer${num}`] || "Answer placeholder"}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* About Page Preview */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">About Page Preview</h2>

          {/* Hero Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("about")
                  setEditSection("hero")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold mb-2">{formData.about?.hero?.heading || "About Us"}</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {formData.about?.hero?.subheading || "Learn more about our company and our mission"}
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("about")
                  setEditSection("mission")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Mission Section</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">{formData.about?.mission?.title || "Our Mission"}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {formData.about?.mission?.statement || "This is a placeholder for your mission statement"}
                </p>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                {formData.about?.mission?.image ? (
                  <img
                    src={formData.about.mission.image || "/placeholder.svg"}
                    alt="Mission"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Mission Image Placeholder</span>
                )}
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("about")
                  setEditSection("vision")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Vision Section</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center md:order-first">
                {formData.about?.vision?.image ? (
                  <img
                    src={formData.about.vision.image || "/placeholder.svg"}
                    alt="Vision"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Vision Image Placeholder</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">{formData.about?.vision?.title || "Our Vision"}</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {formData.about?.vision?.statement || "This is a placeholder for your vision statement"}
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="relative group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("about")
                  setEditSection("team")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Team Section</h3>
            <h2 className="text-2xl font-bold mb-2 text-center">{formData.about?.team?.title || "Our Team"}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto">
              {formData.about?.team?.description || "Meet the talented people behind our success"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => {
                if (!formData.about?.team?.[`member${num}Name`]) return null

                return (
                  <div key={num} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mx-auto mb-4 overflow-hidden">
                      {formData.about?.team?.[`member${num}Image`] ? (
                        <img
                          src={formData.about.team[`member${num || "/placeholder.svg"}Image`]}
                          alt={formData.about.team[`member${num}Name`]}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <h3 className="font-bold">{formData.about?.team?.[`member${num}Name`]}</h3>
                    <p className="text-blue-500 dark:text-blue-400 text-sm mb-2">
                      {formData.about?.team?.[`member${num}Position`] || "Position"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {formData.about?.team?.[`member${num}Bio`] || "Bio placeholder"}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Page Preview */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Contact Page Preview</h2>

          {/* Address Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("contact")
                  setEditSection("address")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Address Section</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">{formData.contact?.address?.title || "Contact Us"}</h2>
                <div className="space-y-2">
                  <p className="font-bold">{formData.contact?.address?.companyName || "Company Name"}</p>
                  <p>{formData.contact?.address?.streetAddress || "123 Street Address"}</p>
                  <p>{formData.contact?.address?.cityStateZip || "City, State ZIP"}</p>
                  <p>{formData.contact?.address?.country || "Country"}</p>
                  <p>Phone: {formData.contact?.address?.phone || "(123) 456-7890"}</p>
                  <p>Email: {formData.contact?.address?.email || "email@example.com"}</p>
                </div>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                {formData.contact?.address?.mapUrl ? (
                  <iframe
                    src={formData.contact.address.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Map Placeholder</span>
                )}
              </div>
            </div>
          </div>

          {/* Enquiry Form */}
          <div className="relative group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("contact")
                  setEditSection("enquiry")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Enquiry Form</h3>
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-2">{formData.contact?.enquiry?.title || "Send us a Message"}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {formData.contact?.enquiry?.description ||
                  "Fill out the form below and we will get back to you as soon as possible"}
              </p>

              <div className="space-y-4">
                {formData.contact?.enquiry?.showName !== false && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Your name"
                      disabled
                    />
                  </div>
                )}

                {formData.contact?.enquiry?.showEmail !== false && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Your email"
                      disabled
                    />
                  </div>
                )}

                {formData.contact?.enquiry?.showPhone && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Your phone number"
                      disabled
                    />
                  </div>
                )}

                {formData.contact?.enquiry?.showSubject && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      placeholder="Subject"
                      disabled
                    />
                  </div>
                )}

                {formData.contact?.enquiry?.showMessage !== false && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                      rows="4"
                      placeholder="Your message"
                      disabled
                    ></textarea>
                  </div>
                )}

                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full" disabled>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Page Preview */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Blog Page Preview</h2>

          {/* Hero Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("blog")
                  setEditSection("hero")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold mb-2">{formData.blog?.hero?.title || "Our Blog"}</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {formData.blog?.hero?.description || "Check out our latest articles and updates"}
              </p>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="relative group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("blog")
                  setEditSection("blogs")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Blog Cards</h3>
            <h2 className="text-2xl font-bold mb-2">{formData.blog?.blogs?.sectionTitle || "Latest Articles"}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {formData.blog?.blogs?.sectionDescription || "Stay updated with our newest content"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4].map((num) => {
                if (!formData.blog?.blogs?.[`blog${num}Title`]) return null

                return (
                  <div key={num} className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                    <div className="h-48 bg-gray-300 dark:bg-gray-600">
                      {formData.blog?.blogs?.[`blog${num}Image`] ? (
                        <img
                          src={formData.blog.blogs[`blog${num || "/placeholder.svg"}Image`]}
                          alt={formData.blog.blogs[`blog${num}Title`]}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{formData.blog?.blogs?.[`blog${num}Title`]}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                        {formData.blog?.blogs?.[`blog${num}Excerpt`] || "Blog excerpt placeholder"}
                      </p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          By {formData.blog?.blogs?.[`blog${num}Author`] || "Author"}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {formData.blog?.blogs?.[`blog${num}Date`]
                            ? new Date(formData.blog.blogs[`blog${num}Date`]).toLocaleDateString()
                            : "Date"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* E-commerce Page Preview */}
      <div className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">E-commerce Page Preview</h2>

          {/* Hero Section */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("ecommerce")
                  setEditSection("hero")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">{formData.ecommerce?.hero?.title || "Our Shop"}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {formData.ecommerce?.hero?.description || "Discover our amazing products"}
                </p>
                {formData.ecommerce?.hero?.ctaText && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {formData.ecommerce.hero.ctaText}
                  </button>
                )}
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                {formData.ecommerce?.hero?.backgroundImage ? (
                  <img
                    src={formData.ecommerce.hero.backgroundImage || "/placeholder.svg"}
                    alt="Shop Hero"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">Shop Image Placeholder</span>
                )}
              </div>
            </div>
          </div>

          {/* Featured Products */}
          <div className="relative group mb-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("ecommerce")
                  setEditSection("featured")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Featured Products</h3>
            <h2 className="text-2xl font-bold mb-2">{formData.ecommerce?.featured?.title || "Featured Products"}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {formData.ecommerce?.featured?.description || "Check out our most popular items"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => {
                if (!formData.ecommerce?.featured?.[`product${num}Name`]) return null

                return (
                  <div key={num} className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                    <div className="h-40 bg-gray-300 dark:bg-gray-600">
                      {formData.ecommerce?.featured?.[`product${num}Image`] ? (
                        <img
                          src={formData.ecommerce.featured[`product${num || "/placeholder.svg"}Image`]}
                          alt={formData.ecommerce.featured[`product${num}Name`]}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1">{formData.ecommerce?.featured?.[`product${num}Name`]}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                        {formData.ecommerce?.featured?.[`product${num}Description`] || "Product description"}
                      </p>
                      <div className="flex items-center">
                        {formData.ecommerce?.featured?.[`product${num}DiscountPrice`] ? (
                          <>
                            <span className="font-bold text-green-600 dark:text-green-400">
                              ${formData.ecommerce.featured[`product${num}DiscountPrice`]}
                            </span>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ${formData.ecommerce.featured[`product${num}Price`]}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold">
                            ${formData.ecommerce?.featured?.[`product${num}Price`] || "0.00"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Product Categories */}
          <div className="relative group p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => {
                  setEditPage("ecommerce")
                  setEditSection("categories")
                }}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
              >
                <Edit size={16} />
              </button>
            </div>

            <h3 className="text-xl font-semibold mb-2">Product Categories</h3>
            <h2 className="text-2xl font-bold mb-6">{formData.ecommerce?.categories?.title || "Shop by Category"}</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => {
                if (!formData.ecommerce?.categories?.[`category${num}Name`]) return null

                return (
                  <div key={num} className="relative bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden h-40">
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="font-bold text-xl">{formData.ecommerce?.categories?.[`category${num}Name`]}</h3>
                        <p className="text-sm">
                          {formData.ecommerce?.categories?.[`category${num}ProductCount`] || "0"} Products
                        </p>
                      </div>
                    </div>
                    {formData.ecommerce?.categories?.[`category${num}Image`] ? (
                      <img
                        src={formData.ecommerce.categories[`category${num || "/placeholder.svg"}Image`]}
                        alt={formData.ecommerce.categories[`category${num}Name`]}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Preview */}
      <div className="relative group mt-8">
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              setEditPage("navFooter")
              setEditSection("footer")
            }}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <Edit size={16} />
          </button>
        </div>

        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">{formData.navFooter?.footer?.footerText || "Company Name"}</h3>
                <p className="text-gray-400 mb-4">
                  {formData.navFooter?.footer?.footerDescription ||
                    "A brief description of your company and what you do."}
                </p>
                <div className="flex space-x-4">
                  {["facebook", "twitter", "instagram", "linkedin", "youtube"].map((social) => {
                    if (!formData.navFooter?.footer?.[`${social}Url`]) return null

                    return (
                      <a
                        key={social}
                        href={formData.navFooter.footer[`${social}Url`]}
                        className="text-gray-400 hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.charAt(0).toUpperCase() + social.slice(1)}
                      </a>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">{formData.navFooter?.footer?.column1Title || "Quick Links"}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((num) => {
                    const linkText = formData.navFooter?.footer?.[`column1Link${num}Text`]
                    const linkUrl = formData.navFooter?.footer?.[`column1Link${num}Url`]

                    if (!linkText) return null

                    return (
                      <li key={num}>
                        <a href={linkUrl || "#"} className="text-gray-400 hover:text-white">
                          {linkText}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">{formData.navFooter?.footer?.column2Title || "Resources"}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((num) => {
                    const linkText = formData.navFooter?.footer?.[`column2Link${num}Text`]
                    const linkUrl = formData.navFooter?.footer?.[`column2Link${num}Url`]

                    if (!linkText) return null

                    return (
                      <li key={num}>
                        <a href={linkUrl || "#"} className="text-gray-400 hover:text-white">
                          {linkText}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <address className="text-gray-400 not-italic">
                  {formData.contact?.address?.streetAddress || "123 Street Address"}
                  <br />
                  {formData.contact?.address?.cityStateZip || "City, State ZIP"}
                  <br />
                  {formData.contact?.address?.country || "Country"}
                  <br />
                  <br />
                  Phone: {formData.contact?.address?.phone || "(123) 456-7890"}
                  <br />
                  Email: {formData.contact?.address?.email || "email@example.com"}
                </address>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>
                {formData.navFooter?.footer?.copyrightText ||
                  `© ${new Date().getFullYear()} Company Name. All rights reserved.`}
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Edit Modal */}
      {editSection && editPage && (
        <EditModal
          section={editSection}
          page={editPage}
          formData={formData[editPage]?.[editSection] || {}}
          onClose={() => {
            setEditSection(null)
            setEditPage(null)
          }}
          onSave={async (data) => {
            try {
              // Send data to API
              const response = await fetch(`/api/cms/${editPage}/${editSection}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })

              if (!response.ok) throw new Error("Failed to save section")

              // Update local state
              setFormData((prev) => ({
                ...prev,
                [editPage]: {
                  ...prev[editPage],
                  [editSection]: data,
                },
              }))

              // Update localStorage
              localStorage.setItem(
                "cmsFormData",
                JSON.stringify({
                  ...formData,
                  [editPage]: {
                    ...formData[editPage],
                    [editSection]: data,
                  },
                }),
              )

              setEditSection(null)
              setEditPage(null)

              toast({
                title: "Success",
                description: `${editSection} section updated successfully`,
              })
            } catch (error) {
              toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
              })
            }
          }}
        />
      )}
    </div>
  )
}

