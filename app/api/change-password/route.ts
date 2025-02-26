import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { verifyToken } from "@/lib/jwt"
import fs from "fs/promises"
import path from "path"

export async function POST(request: Request) {
  // Verify the token
  const authHeader = request.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]
  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const { currentPassword, newPassword } = await request.json()

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

  if (!adminUsername || !adminPasswordHash) {
    console.error("Admin credentials are not properly configured")
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
  }

  // Verify current password
  if (!(await bcrypt.compare(currentPassword, adminPasswordHash))) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
  }

  // Hash the new password
  const newPasswordHash = await bcrypt.hash(newPassword, 10)

  // Update the environment variable
  process.env.ADMIN_PASSWORD_HASH = newPasswordHash

  // Update the .env file
  const envFilePath = path.join(process.cwd(), ".env")
  let envContent = await fs.readFile(envFilePath, "utf-8")
  envContent = envContent.replace(/^ADMIN_PASSWORD_HASH=.*$/m, `ADMIN_PASSWORD_HASH=${newPasswordHash}`)
  await fs.writeFile(envFilePath, envContent)

  return NextResponse.json({ message: "Password changed successfully" })
}

