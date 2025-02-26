import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/jwt"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const donors = await prisma.donor.findMany({
      orderBy: { amount: "desc" },
    })
    return NextResponse.json(donors)
  } catch (error) {
    console.error("Failed to fetch donors:", error)
    return NextResponse.json({ error: "Failed to fetch donors" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  console.log("POST request received") // Add this line for debugging

  // Check for authentication
  const authHeader = request.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Unauthorized: No Bearer token") // Add this line for debugging
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]
  const payload = verifyToken(token)
  if (!payload) {
    console.log("Unauthorized: Invalid token") // Add this line for debugging
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  try {
    const { name, amount } = await request.json()
    console.log("Received donor data:", { name, amount }) // Add this line for debugging

    const donor = await prisma.donor.create({
      data: { name, amount: Number.parseFloat(amount) },
    })
    console.log("Donor created:", donor) // Add this line for debugging
    return NextResponse.json(donor)
  } catch (error) {
    console.error("Failed to create donor:", error)
    return NextResponse.json({ error: "Failed to create donor" }, { status: 500 })
  }
}

