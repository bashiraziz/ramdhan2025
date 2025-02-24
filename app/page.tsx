export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-800 sm:text-5xl">Welcome to Ramadan 2025 Food Distribution</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Supporting the needy during the holy month of Ramadan through organized food distribution across multiple
          locations.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To ensure that families in need have access to essential food items during the blessed month of Ramadan.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Coverage</h2>
          <p className="text-gray-600">
            Plan is to serving over 700 households across multiple locations, reaching those most in need.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-700 mb-4">Distribution</h2>
          <p className="text-gray-600">
            Organized distribution of essential food items including rice, cooking oil, sugar, and other necessities.
          </p>
        </div>
      </div>
    </div>
  )
}

