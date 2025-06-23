"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Star, CheckCircle, Briefcase, Award } from "lucide-react"

interface ArtistProfile {
  id: number
  user: {
    username?: string
    name: string
    profile_picture?: string
    commissions_count?: number
  }
  is_verified: boolean
  portfolio_link?: string
  services_count?: number
  rating: number
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<ArtistProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockArtists: ArtistProfile[] = [
      {
        id: 1,
        user: {
          username: "alice_art",
          name: "Alice Johnson",
          profile_picture: "/placeholder.svg?height=100&width=100",
          commissions_count: 45,
        },
        is_verified: true,
        portfolio_link: "https://alice-art.com",
        services_count: 8,
        rating: 4.9,
      },
      {
        id: 2,
        user: {
          username: "bob_design",
          name: "Bob Smith",
          profile_picture: "/placeholder.svg?height=100&width=100",
          commissions_count: 32,
        },
        is_verified: false,
        portfolio_link: "https://bob-designs.com",
        services_count: 5,
        rating: 4.7,
      },
      {
        id: 3,
        user: {
          username: "carol_creates",
          name: "Carol Williams",
          profile_picture: "/placeholder.svg?height=100&width=100",
          commissions_count: 67,
        },
        is_verified: true,
        portfolio_link: "https://carol-creative.com",
        services_count: 12,
        rating: 4.8,
      },
    ]

    setTimeout(() => {
      setArtists(mockArtists)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Artists</h1>
          <p className="text-gray-600">Discover talented artists and their amazing work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artistProfile) => (
            <Card key={artistProfile.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <Image
                      src={artistProfile.user.profile_picture || "/placeholder.svg?height=64&width=64"}
                      alt={artistProfile.user.name}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                    {artistProfile.is_verified && (
                      <CheckCircle className="absolute -bottom-1 -right-1 h-5 w-5 text-blue-500 bg-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{artistProfile.user.username || artistProfile.user.name}</h3>
                    <p className="text-sm text-gray-600">{artistProfile.user.name}</p>

                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{artistProfile.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                    <span>{artistProfile.user.commissions_count || 0} commissions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gray-400" />
                    <span>{artistProfile.services_count || 0} services</span>
                  </div>
                </div>

                {artistProfile.portfolio_link && (
                  <div className="mb-4">
                    <a
                      href={artistProfile.portfolio_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View Portfolio →
                    </a>
                  </div>
                )}

                <Button className="w-full" asChild>
                  <Link href={`/artists/${artistProfile.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
