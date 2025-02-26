import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { signToken } from "@/lib/jwt"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminUsername || !adminPasswordHash) {
    console.error("Admin credentials are not properly configured")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  if (username === adminUsername && (await bcrypt.compare(password, adminPasswordHash))) {
    const token = signToken({ username })
    return NextResponse.json({ token })
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}
