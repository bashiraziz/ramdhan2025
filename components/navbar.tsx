"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Info, Users, Calculator, MapPin, Image, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"

const navItems = [
  { href: "/about", label: "About", icon: Info },
  { href: "/donors", label: "Donors", icon: Users },
  { href: "/budget", label: "Budget", icon: Calculator },
  { href: "/locations", label: "Locations", icon: MapPin },
  { href: "/gallery", label: "Gallery", icon: Image },
] as const

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="bg-[#0F7B2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-white/90">
            <Home className="h-6 w-6" />
            <span className="font-semibold text-lg">Ramadan 2025 Food Distribution</span>
          </Link>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 text-white hover:text-white/90 ${
                  pathname === item.href ? "font-semibold" : ""
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {isLoggedIn && (
              <button onClick={handleLogout} className="flex items-center space-x-1 text-white hover:text-white/90">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}