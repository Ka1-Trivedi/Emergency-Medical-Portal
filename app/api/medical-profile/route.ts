import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { medicalProfile: true },
  })

  if (!user || !user.medicalProfile) {
    return NextResponse.json({ error: "Medical profile not found" }, { status: 404 })
  }

  return NextResponse.json(user.medicalProfile)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const medicalProfile = await prisma.medicalProfile.upsert({
    where: { userId: user.id },
    update: data,
    create: { ...data, userId: user.id },
  })

  return NextResponse.json(medicalProfile)
}

