import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const aadhar = searchParams.get("aadhar")

  if (!aadhar) {
    return NextResponse.json({ error: "Aadhar number is required" }, { status: 400 })
  }

  const user = await prisma.medicalRecord.findUnique({
    where: { aadharNumber: aadhar },
    select: {
      id: true,
      aadharNumber: true,
      name: true,
      age: true,
      bloodType: true,
      medicalInfo: true,
    },
  })

  if (!user) {
    return NextResponse.json({ error: "Medical profile not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { aadharNumber, name, age, bloodType, medicalInfo } = body

    const newRecord = await prisma.medicalRecord.create({
      data: {
        aadharNumber,
        name,
        age: Number.parseInt(age),
        bloodType,
        medicalInfo,
      },
    })

    return NextResponse.json(newRecord, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

