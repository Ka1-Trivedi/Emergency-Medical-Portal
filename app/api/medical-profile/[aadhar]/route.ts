import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { aadhar: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "MEDICAL_PERSONNEL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { aadharNumber: params.aadhar },
    include: { medicalProfile: { include: { emergencyContacts: true } } },
  })

  if (!user || !user.medicalProfile) {
    return NextResponse.json({ error: "Medical profile not found" }, { status: 404 })
  }

  return NextResponse.json(user.medicalProfile)
}

