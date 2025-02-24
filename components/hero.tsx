import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-green-900 sm:text-5xl md:text-6xl">
            Ramadan 2025 Food Distribution
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-green-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join us in spreading blessings this Ramadan by providing meals to those in need.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

