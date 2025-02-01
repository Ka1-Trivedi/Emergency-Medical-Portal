"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function Profile() {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    age: "",
    bloodType: "",
    allergies: "",
    medications: "",
    conditions: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/medical-profile")
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/medical-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    })
    if (res.ok) {
      toast({
        title: "Profile Updated",
        description: "Your medical profile has been successfully updated.",
      })
    } else {
      toast({
        title: "Error",
        description: "Failed to update your medical profile.",
        variant: "destructive",
      })
    }
  }

  if (!session) {
    return <div>Please sign in to view your profile.</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="age">Age</Label>
        <Input id="age" name="age" type="number" value={profile.age} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="bloodType">Blood Type</Label>
        <Input id="bloodType" name="bloodType" value={profile.bloodType} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="allergies">Allergies</Label>
        <Textarea id="allergies" name="allergies" value={profile.allergies} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="medications">Medications</Label>
        <Textarea id="medications" name="medications" value={profile.medications} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="conditions">Medical Conditions</Label>
        <Textarea id="conditions" name="conditions" value={profile.conditions} onChange={handleChange} />
      </div>
      <Button type="submit">Update Profile</Button>
    </form>
  )
}

