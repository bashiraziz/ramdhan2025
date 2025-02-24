import Link from "next/link"
import { Home, Info, Image, MapPin, Calculator, Users } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-green-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="font-bold text-xl">Ramadan 2025 Food Distribution</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about" className="flex items-center space-x-1 text-white hover:text-green-200">
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link href="/donors" className="flex items-center space-x-1 text-white hover:text-green-200">
                <Users className="h-4 w-4" />
                <span>Donors</span>
              </Link>
            </li>
            <li>
              <Link href="/budget" className="flex items-center space-x-1 text-white hover:text-green-200">
                <Calculator className="h-4 w-4" />
                <span>Budget</span>
              </Link>
            </li>
            <li>
              <Link href="/locations" className="flex items-center space-x-1 text-white hover:text-green-200">
                <MapPin className="h-4 w-4" />
                <span>Locations</span>
              </Link>
            </li>
            <li>
              <Link href="/media" className="flex items-center space-x-1 text-white hover:text-green-200">
                <Image className="h-4 w-4" />
                <span>Gallery</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

