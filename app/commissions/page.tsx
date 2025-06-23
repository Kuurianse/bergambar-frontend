"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Plus, Heart, User, Edit, Trash2 } from "lucide-react"

interface Commission {
  id: number
  description: string
  user: {
    username?: string
    name: string
  }
  user_id: number
  total_price: number
  public_status: string
  image?: string
  loved_count?: number
}

export default function CommissionsPage() {
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId] = useState(1) // Mock current user ID

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockCommissions: Commission[] = [
      {
        id: 1,
        description: "Fantasy character design with magical elements and detailed armor",
        user: { username: "alice_art", name: "Alice Johnson" },
        user_id: 2,
        total_price: 250,
        public_status: "completed",
        image: "/placeholder.svg?height=300&width=400",
        loved_count: 32,
      },
      {
        id: 2,
        description: "Portrait commission in anime style",
        user: { username: "bob_design", name: "Bob Smith" },
        user_id: 1,
        total_price: 150,
        public_status: "in_progress",
        image: "/placeholder.svg?height=300&width=400",
        loved_count: 18,
      },
      {
        id: 3,
        description: "Logo design for tech startup with modern aesthetic",
        user: { username: "carol_creates", name: "Carol Williams" },
        user_id: 3,
        total_price: 300,
        public_status: "completed",
        image: "/placeholder.svg?height=300&width=400",
        loved_count: 45,
      },
    ]

    setTimeout(() => {
      setCommissions(mockCommissions)
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = async (commissionId: number) => {
    if (confirm("Are you sure you want to delete this commission?")) {
      // Implement delete functionality
      setCommissions((prev) => prev.filter((c) => c.id !== commissionId))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
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
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Commissions</h1>
            <p className="text-gray-600">Browse and manage commission artwork</p>
          </div>

          <Button asChild>
            <Link href="/commissions/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Commission
            </Link>
          </Button>
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
                  {commission.public_status.replace("_", " ")}
                </Badge>
              </div>

              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{commission.description}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{commission.user.username || commission.user.name}</span>
                  </div>
                  <span className="font-semibold text-primary">${commission.total_price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{commission.loved_count || 0}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {currentUserId === commission.user_id && (
                      <>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/commissions/${commission.id}/edit`}>
                            <Edit className="h-3 w-3" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(commission.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                    <Button size="sm" asChild>
                      <Link href={`/commissions/${commission.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {commissions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No commissions found</h3>
            <p className="text-gray-600 mb-4">Start by creating your first commission</p>
            <Button asChild>
              <Link href="/commissions/create">Create Commission</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
