import { Button } from "@/components/ui/button"
export default function Donate() {
  return (
    <div className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Support Our Cause</h2>
          <p className="mt-4 text-lg">Your donation can make a difference in someone&aposs life this Ramadan.</p>
          <div className="mt-8 flex justify-center">
            <Button className="bg-white text-green-700 hover:bg-green-100">Donate Now</Button>
          </div>
          <p className="mt-4 text-sm">
            Interested in volunteering?{" "}
            <a href="/volunteer" className="underline">
              Learn more about our volunteer opportunities
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

