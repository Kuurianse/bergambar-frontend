"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Star, CheckCircle, Mail, MessageCircle, Edit, ExternalLink } from "lucide-react"

interface Artist {
  id: number
  user: {
    profile_picture?: string
    username?: string
    name: string
    bio?: string
    email: string
  }
  user_id: number
  portfolio_link?: string
  is_verified: boolean
  rating: number
  services: Service[]
}

interface Service {
  id: number
  title: string
  description: string
  price: number
  service_type: string
}

interface Commission {
  id: number
  image?: string
  description: string
  total_price: number
  public_status: string
  loved_count?: number
}

export default function ArtistProfilePage() {
  const params = useParams()
  const [artist, setArtist] = useState<Artist | null>(null)
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId] = useState(1) // Mock current user ID

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockArtist: Artist = {
      id: Number.parseInt(params.id as string),
      user: {
        profile_picture: "/placeholder.svg?height=150&width=150",
        username: "alice_art",
        name: "Alice Johnson",
        bio: "Professional digital artist specializing in character design and illustrations. 5+ years of experience creating artwork for games, books, and personal commissions.",
        email: "alice@example.com",
      },
      user_id: 1,
      portfolio_link: "https://alice-art.com",
      is_verified: true,
      rating: 4.9,
      services: [
        {
          id: 1,
          title: "Character Design",
          description: "Custom character illustrations for games, books, or personal use",
          price: 150,
          service_type: "illustration",
        },
        {
          id: 2,
          title: "Portrait Commission",
          description: "Digital portraits in various styles",
          price: 100,
          service_type: "portrait",
        },
      ],
    }

    const mockCommissions: Commission[] = [
      {
        id: 1,
        image: "/placeholder.svg?height=200&width=300",
        description: "Fantasy character design for RPG game",
        total_price: 200,
        public_status: "completed",
        loved_count: 15,
      },
      {
        id: 2,
        image: "/placeholder.svg?height=200&width=300",
        description: "Portrait commission with magical elements",
        total_price: 150,
        public_status: "completed",
        loved_count: 23,
      },
    ]

    setTimeout(() => {
      setArtist(mockArtist)
      setCommissions(mockCommissions)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full" />
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-48" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Artist Not Found</h1>
            <p className="text-gray-600 mb-4">The artist you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/artists">Browse Artists</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Artist Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <Image
                  src={artist.user.profile_picture || "/placeholder.svg?height=150&width=150"}
                  alt={artist.user.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover"
                />
                {artist.is_verified && (
                  <CheckCircle className="absolute -bottom-2 -right-2 h-8 w-8 text-blue-500 bg-white rounded-full p-1" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{artist.user.username || artist.user.name}</h1>
                  {artist.is_verified && <Badge variant="secondary">Verified</Badge>}
                </div>

                <p className="text-xl text-gray-600 mb-2">{artist.user.name}</p>

                <div className="flex items-center space-x-1 mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{artist.rating}</span>
                  <span className="text-gray-500">rating</span>
                </div>

                <p className="text-gray-700 mb-6 max-w-2xl">{artist.user.bio || "No bio provided."}</p>

                <div className="flex flex-wrap gap-3">
                  {currentUserId !== artist.user_id && (
                    <>
                      <Button asChild>
                        <Link href={`/chat/${artist.user_id}`}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Link>
                      </Button>
                      <Button variant="outline">
                        <Mail className="h-4 w-4 mr-2" />
                        {artist.user.email}
                      </Button>
                    </>
                  )}

                  {currentUserId === artist.user_id && (
                    <Button asChild>
                      <Link href={`/artists/${artist.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                  )}

                  {artist.portfolio_link && (
                    <Button variant="outline" asChild>
                      <a href={artist.portfolio_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Portfolio
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {artist.services.length > 0 ? (
                artist.services.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{service.title}</h3>
                      <span className="font-bold text-primary">${service.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <Badge variant="outline">{service.service_type}</Badge>
                    <div className="mt-3">
                      <Button size="sm" asChild>
                        <Link href={`/services/${service.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No services available</p>
              )}
            </CardContent>
          </Card>

          {/* Portfolio/Commissions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Work</CardTitle>
            </CardHeader>
            <CardContent>
              {commissions.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {commissions.map((commission) => (
                    <div key={commission.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-video relative">
                        <Image
                          src={commission.image || "/placeholder.svg?height=200&width=300"}
                          alt={commission.description}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-2">{commission.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-primary">${commission.total_price}</span>
                          <Button size="sm" asChild>
                            <Link href={`/commissions/${commission.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recent work to display</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
