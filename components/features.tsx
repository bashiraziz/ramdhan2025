import { Utensils, Users, MapPin, Clock } from "lucide-react"

const features = [
  {
    name: "Nutritious Meals",
    description: "We provide balanced, halal meals to break the fast.",
    icon: Utensils,
  },
  {
    name: "Community Focused",
    description: "Serving local communities and fostering unity.",
    icon: Users,
  },
  {
    name: "Multiple Locations",
    description: "Distribution points across the city for easy access.",
    icon: MapPin,
  },
  {
    name: "Daily Distribution",
    description: "Fresh meals provided every day during Ramadan.",
    icon: Clock,
  },
]

export default function Features() {
  return (
    <div className="py-12 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Our Program</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Feeding the Community
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our Ramadan food distribution program is designed to reach as many people as possible with quality,
            nutritious meals.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

