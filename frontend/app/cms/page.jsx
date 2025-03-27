import CreateButton from "@/components/cms/create-button"

export default function CMSPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Website CMS</h1>
          <CreateButton />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Welcome to your CMS</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Use the "Create" button in the top right corner to start building your website. You'll be guided through a
              step-by-step process to create content for each page.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Getting Started</h3>
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Click the "Create" button to open the form wizard</li>
                <li>Fill out the information for each section of your website</li>
                <li>Preview your website and make any necessary edits</li>
                <li>Click "Finish" when you're satisfied with the result</li>
              </ol>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Home Page</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Create your hero section, why choose us section, and FAQs.
              </p>
              <div className="text-xs text-gray-500">Sections: 3</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">About Page</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Create your hero, mission, vision, and team sections.
              </p>
              <div className="text-xs text-gray-500">Sections: 4</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Contact Page</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Set up your address information and enquiry form.
              </p>
              <div className="text-xs text-gray-500">Sections: 2</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Blog Page</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Create your blog hero section and blog cards.
              </p>
              <div className="text-xs text-gray-500">Sections: 2</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">E-commerce Page</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Set up your shop hero, featured products, and categories.
              </p>
              <div className="text-xs text-gray-500">Sections: 3</div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-bold mb-2">Navigation & Footer</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Configure your site navigation and footer content.
              </p>
              <div className="text-xs text-gray-500">Sections: 2</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

