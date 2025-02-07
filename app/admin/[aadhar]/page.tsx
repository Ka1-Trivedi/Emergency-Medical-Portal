"use client"

import { useState } from "react"

export default function Admin() {
  const [aadhar, setAadhar] = useState("")
  const [profile, setProfile] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch(`/api/medical-profile/${aadhar}`)
      if (!response.ok) {
        throw new Error("Profile not found")
      }
      const data = await response.json()
      // console.log(response.body);
      // console.log("profiledata"+profile);
      setProfile(data)
    } catch (err: any) {
      setError(err.message)
      setProfile(null)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex space-x-4 mb-6">
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          placeholder="Enter Aadhar Number"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Data Table */}
      {profile && (
        <div className="border rounded-lg shadow-md p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4">Medical Profile</h2>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-3 border font-semibold">ID</td>
                <td className="p-3 border">{profile.id}</td>
              </tr>
              <tr>
                <td className="p-3 border font-semibold">Aadhar Number</td>
                <td className="p-3 border">{profile.aadharNumber}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-3 border font-semibold">Name</td>
                <td className="p-3 border">{profile.name}</td>
              </tr>
              <tr>
                <td className="p-3 border font-semibold">Age</td>
                <td className="p-3 border">{profile.age}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="p-3 border font-semibold">Blood Type</td>
                <td className="p-3 border">{profile.bloodType}</td>
              </tr>
              <tr>
                <td className="p-3 border font-semibold">Medical Information</td>
                <td className="p-3 border">{profile.medicalInfo }</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
