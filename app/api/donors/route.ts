import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/jwt"

// Create a single PrismaClient instance to be reused
const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    // Simplified error handling for auth
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const donors = await prisma.donor.findMany({
      orderBy: { amount: "desc" },
    })

    return NextResponse.json(donors)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const { name, amount } = await request.json()

    if (!name || typeof amount !== "number") {
      return NextResponse.json({ message: "Invalid donor data" }, { status: 400 })
    }

    const donor = await prisma.donor.create({
      data: { name, amount },
    })

    return NextResponse.json(donor)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}


