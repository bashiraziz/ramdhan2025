import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Users, MapPin, Heart } from "lucide-react"

const aboutCards = [
  {
    title: "Our Mission",
    description:
      "To ensure that families in need have access to essential food items during the blessed month of Ramadan.",
    icon: Heart,
  },
  {
    title: "Coverage",
    description: "Serving over 700 households across multiple locations, reaching those most in need.",
    icon: MapPin,
  },
  {
    title: "Distribution",
    description:
      "Organized distribution of essential food items including rice, cooking oil, sugar, and other necessities.",
    icon: Utensils,
  },
  {
    title: "Community Impact",
    description: "Fostering a sense of unity and support within our community during this holy month.",
    icon: Users,
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">About Ramadan 2025 Food Distribution</h1>

      <div className="prose prose-green max-w-3xl mx-auto mb-12">
        <p className="text-center text-lg text-gray-600">
          The Ramadan 2025 Food Distribution project is a community-driven initiative aimed at providing essential food
          supplies to families in need during the holy month of Ramadan.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {aboutCards.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <card.icon className="h-8 w-8 text-green-600" />
              <CardTitle className="text-xl font-semibold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 prose prose-green max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">How It Works</h2>
        <p>
          We work closely with local mosques and community leaders to identify families in need. Our team of volunteers
          prepares food packages containing essential items such as rice, cooking oil, sugar, and other staples. These
          packages are then distributed to the identified families in the days leading up to and during Ramadan.
        </p>

        <h2 className="text-2xl font-semibold text-green-800 mb-4 mt-8">Get Involved</h2>
        <p>There are several ways you can support our initiative:</p>
        <ul>
          <li>Donate funds to help purchase food items</li>
          <li>Volunteer for package preparation and distribution</li>
          <li>Spread awareness about our project in your community</li>
          <li>Partner with us as a local business or organization</li>
        </ul>

        <p className="mt-8">
          Together, we can make a significant difference in the lives of those in need during this blessed month. Join
          us in this rewarding journey of compassion and community service.
        </p>
      </div>
    </div>
  )
}