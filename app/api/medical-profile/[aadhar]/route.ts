import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { aadhar: string } }) {
  const user = await prisma.medicalRecord.findUnique({
    where: { aadharNumber: params.aadhar },
    select: {
      id: true,
      aadharNumber: true,
      name: true,
      age: true,
      bloodType: true,
      medicalInfo: true
    }
  })
  
  if (!user) {
    return NextResponse.json({ error: "Medical profile not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}