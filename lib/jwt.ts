import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  console.error("JWT_SECRET is not set in environment variables")
}

export function signToken(payload: object): string {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set")
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export function verifyToken(token: string): any {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set")
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

