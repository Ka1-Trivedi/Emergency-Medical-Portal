"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Admin() {
  const [aadhar, setAadhar] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/admin/${aadhar}`)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter Aadhar Number"
          className="p-2 border rounded mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>
    </div>
  )
}

