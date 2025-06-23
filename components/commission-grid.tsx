"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, User } from "lucide-react"

interface Commission {
  id: number
  description: string
  user: {
    name: string
    username?: string
  }
  public_status: string
  total_price: number
  image?: string
  loves: any[]
  loved_count: number
}

export function CommissionGrid() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCommissions: Commission[] = [
      {
        id: 1,
        description: "Beautiful landscape painting with mountains and sunset",
        user: { name: "Alice Artist", username: "alice_art" },
        public_status: "completed",
        total_price: 150,
        image: "/placeholder.svg?height=300&width=400",
        loves: [],
        loved_count: 24,
      },
      {
        id: 2,
        description: "Character design for fantasy novel",
        user: { name: "Bob Designer", username: "bob_design" },
        public_status: "completed",
        total_price: 200,
        image: "/placeholder.svg?height=300&width=400",
        loves: [],
        loved_count: 18,
      },
      {
        id: 3,
        description: "Logo design for tech startup",
        user: { name: "Carol Creative", username: "carol_creates" },
        public_status: "completed",
        total_price: 300,
        image: "/placeholder.svg?height=300&width=400",
        loves: [],
        loved_count: 32,
      },
    ]

    setTimeout(() => {
      setCommissions(mockCommissions)
      setLoading(false)
    }, 1000)
  }, [])

  const handleLove = async (commissionId: number) => {
    // Implement love toggle functionality
    console.log("Toggle love for commission:", commissionId)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Commissions</h2>
        <p className="text-gray-600">Discover amazing artwork from our talented community</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {commissions.map((commission) => (
          <Card key={commission.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative">
              <Image
                src={commission.image || "/placeholder.svg?height=300&width=400"}
                alt={commission.description}
                fill
                className="object-cover"
              />
              <Badge
                className="absolute top-2 right-2"
                variant={commission.public_status === "completed" ? "default" : "secondary"}
              >
                {commission.public_status}
              </Badge>
            </div>

            <CardContent className="p-4">
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{commission.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{commission.user.username || commission.user.name}</span>
                </div>
                <span className="font-semibold text-primary">${commission.total_price}</span>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLove(commission.id)}
                  className="flex items-center space-x-1"
                >
                  <Heart className="h-4 w-4" />
                  <span>{commission.loved_count}</span>
                </Button>

                <Button size="sm" asChild>
                  <Link href={`/commissions/${commission.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
