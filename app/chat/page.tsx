"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navigation } from "@/components/navigation"
import { MessageCircle } from "lucide-react"

interface ChatUser {
  id: number
  name: string
  username?: string
  profile_picture?: string
  lastMessage: string
  lastMessageTime: string
}

export default function ChatIndexPage() {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockChatUsers: ChatUser[] = [
      {
        id: 1,
        name: "Alice Johnson",
        username: "alice_art",
        profile_picture: "/placeholder.svg?height=40&width=40",
        lastMessage: "Thanks for the commission! I'll start working on it right away.",
        lastMessageTime: "2 hours ago",
      },
      {
        id: 2,
        name: "Bob Smith",
        username: "bob_design",
        profile_picture: "/placeholder.svg?height=40&width=40",
        lastMessage: "Could you provide more details about the style you want?",
        lastMessageTime: "1 day ago",
      },
      {
        id: 3,
        name: "Carol Williams",
        username: "carol_creates",
        profile_picture: "/placeholder.svg?height=40&width=40",
        lastMessage: "The artwork is ready for review!",
        lastMessageTime: "3 days ago",
      },
    ]

    setTimeout(() => {
      setChatUsers(mockChatUsers)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                  </div>
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
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Your conversations with artists and clients</p>
          </div>

          {chatUsers.length > 0 ? (
            <div className="space-y-4">
              {chatUsers.map((chatUser) => (
                <Link key={chatUser.id} href={`/chat/${chatUser.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={chatUser.profile_picture || "/placeholder.svg"} alt={chatUser.name} />
                          <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">{chatUser.name}</h3>
                            <span className="text-sm text-gray-500">{chatUser.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{chatUser.lastMessage}</p>
                        </div>

                        <MessageCircle className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                <p className="text-gray-600">Start a conversation with an artist to see your messages here</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
