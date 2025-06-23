"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Package, User, Calendar, DollarSign } from "lucide-react"

interface Order {
  id: number
  commission: {
    title?: string
    user: {
      name: string
    }
  }
  commission_id: number
  total_price: number
  status: string
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockOrders: Order[] = [
      {
        id: 1,
        commission: {
          title: "Fantasy Character Design",
          user: { name: "Alice Johnson" },
        },
        commission_id: 1,
        total_price: 250,
        status: "completed",
        created_at: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        commission: {
          title: "Portrait Commission",
          user: { name: "Bob Smith" },
        },
        commission_id: 2,
        total_price: 150,
        status: "in_progress",
        created_at: "2024-01-10T14:20:00Z",
      },
      {
        id: 3,
        commission: {
          title: "Logo Design",
          user: { name: "Carol Williams" },
        },
        commission_id: 3,
        total_price: 300,
        status: "pending",
        created_at: "2024-01-08T09:15:00Z",
      },
    ]

    setTimeout(() => {
      setOrders(mockOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in_progress":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-48 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-32 animate-pulse" />
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your commission orders and their progress</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">{index + 1}</span>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{order.commission.title || "N/A"}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{order.commission.user.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(order.created_at)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${order.total_price}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge variant={getStatusColor(order.status)}>{order.status.replace("_", " ")}</Badge>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/commissions/${order.commission_id}`}>
                            <Package className="h-4 w-4 mr-1" />
                            View Commission
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/orders/${order.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-4">
                You haven't placed any orders yet. Browse commissions to get started.
              </p>
              <Button asChild>
                <Link href="/commissions">Browse Commissions</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
