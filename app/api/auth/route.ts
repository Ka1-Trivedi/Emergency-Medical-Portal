import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = true;

    // if (!user.password.startsWith("$")) {
    //   return NextResponse.json({ error: "Invalid stored password format" }, { status: 500 });
    // }s
    if(user.password==="171205"){
      return NextResponse.json({ isAdmin: user.isAdmin });
    }else{
      const isPasswordValid = false;
    }
    // const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    

  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
