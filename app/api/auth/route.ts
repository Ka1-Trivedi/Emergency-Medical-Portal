import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import argon2 from "argon2" ;

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  const isPasswordValid = await argon2.verify(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }

  return NextResponse.json({ isAdmin: user.isAdmin })
}

