import { Suspense } from "react"
import { WelcomeSection } from "@/components/welcome-section"
import { CommissionGrid } from "@/components/commission-grid"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <WelcomeSection />
        <Suspense fallback={<div className="flex justify-center p-8">Loading commissions...</div>}>
          <CommissionGrid />
        </Suspense>
      </main>
    </div>
  )
}
