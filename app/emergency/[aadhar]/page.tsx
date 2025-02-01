"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function EmergencyAccess({ params }: { params: { aadhar: string } }) {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      if (session?.user?.role === "MEDICAL_PERSONNEL") {
        const res = await fetch(`/api/medical-profile/${params.aadhar}`)
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch medical profile.",
            variant: "destructive",
          })
        }
      }
    }
    fetchProfile()
  }, [session, params.aadhar, toast])

  if (!session || session.user.role !== "MEDICAL_PERSONNEL") {
    return <div>Unauthorized. This page is only accessible to medical personnel.</div>
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Emergency Medical Information</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p>Age: {profile.age}</p>
          <p>Blood Type: {profile.bloodType}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Allergies</h2>
          <ul>
            {profile.allergies.map((allergy: string, index: number) => (
              <li key={index}>{allergy}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Medications</h2>
          <ul>
            {profile.medications.map((medication: string, index: number) => (
              <li key={index}>{medication}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Medical Conditions</h2>
          <ul>
            {profile.conditions.map((condition: string, index: number) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Emergency Contacts</h2>
          {profile.emergencyContacts.map((contact: any, index: number) => (
            <div key={index} className="mb-2">
              <p>
                {contact.name} ({contact.relation})
              </p>
              <Button variant="outline" onClick={() => (window.location.href = `tel:${contact.phone}`)}>
                Call {contact.phone}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

