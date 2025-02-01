"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function QRCode() {
  const { data: session } = useSession()
  const [aadharNumber, setAadharNumber] = useState("")
  const [qrValue, setQrValue] = useState("")

  useEffect(() => {
    const fetchAadharNumber = async () => {
      const res = await fetch("/api/user")
      if (res.ok) {
        const data = await res.json()
        setAadharNumber(data.aadharNumber)
        setQrValue(`https://example.com/emergency/${data.aadharNumber}`)
      }
    }
    if (session) {
      fetchAadharNumber()
    }
  }, [session])

  if (!session) {
    return <div>Please sign in to generate your QR code.</div>
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="aadharNumber">Your Aadhar Number</Label>
        <Input id="aadharNumber" value={aadharNumber} readOnly />
      </div>
      <div className="mt-4">
        <QRCodeSVG value={qrValue} size={256} />
      </div>
      <p>Scan this QR code or use this link for emergency access:</p>
      <a href={qrValue} className="text-blue-600 hover:underline">
        {qrValue}
      </a>
    </div>
  )
}

