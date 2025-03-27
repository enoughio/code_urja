"use client"

import { useState } from "react"
import CreateForm from "./create-form"

export default function CreateButton() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors"
      >
        Create
      </button>

      {isFormOpen && <CreateForm onClose={() => setIsFormOpen(false)} />}
    </>
  )
}

