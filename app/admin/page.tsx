"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Admin() {
  const [aadhar, setAadhar] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (aadhar) {
      router.push(`/admin/${aadhar}`)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">1. Search Medical Record</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            placeholder="Enter Aadhar Number"
            className="flex-grow p-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">2. Create Medical Record</h2>
        <Link
          href="/admin/create-record"
          className="inline-block p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create New Record
        </Link>
      </div>
    </div>
  )
}

