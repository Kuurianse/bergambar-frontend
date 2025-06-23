import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function WelcomeSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Commission Amazing
              <span className="text-primary"> Artwork</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with talented artists and bring your creative visions to life. Browse portfolios, commission
              custom artwork, and support the creative community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/artists">Browse Artists</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/commissions">View Commissions</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Hero artwork"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
