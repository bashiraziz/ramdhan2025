import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@ramadanfood2025.org">info@ramadanfood2025.org</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Location</h3>
            <p className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-1" />
              <span>123 Charity Street, Cityville, State 12345, Country</span>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">{/* Add social media icons/links here */}</div>
          </div>
        </div>
        <div className="mt-8 border-t border-green-700 pt-8 text-center">
          <p className="text-sm">&copy; 2025 Ramadan Food Distribution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

