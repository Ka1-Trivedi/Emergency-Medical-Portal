import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { aadhar: string } }) {
  const { aadhar } = params

  if (!aadhar) {
    return NextResponse.json({ error: "Aadhar number is required" }, { status: 400 })
  }

  const record = await prisma.medicalRecord.findUnique({
    where: { aadharNumber: aadhar },
  })

  if (!record) {
    return NextResponse.json({ error: "Record not found" }, { status: 404 })
  }

  return NextResponse.json(record)
}

