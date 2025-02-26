"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Video, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import Image from "next/image"

type MediaItem = {
  type: "image" | "video"
  url: string
  title: string
  date: string
}

const initialMedia: MediaItem[] = [
  {
    type: "image",
    url: "/placeholder.svg?height=200&width=300",
    title: "Food Distribution Day 1",
    date: "2025-03-15",
  },
  {
    type: "video",
    url: "/placeholder.svg?height=200&width=300",
    title: "Preparation of Food Packages",
    date: "2025-03-14",
  },
]

export default function GalleryPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMedia)
  const [editMode, setEditMode] = useState(false)
  const [newMedia, setNewMedia] = useState<MediaItem>({
    type: "image",
    url: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
  })
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn || !editMode) return

    setMediaItems([...mediaItems, newMedia])
    setNewMedia({
      type: "image",
      url: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
    })
  }

  const handleDelete = (index: number) => {
    if (!isLoggedIn || !editMode) return

    const newMediaItems = mediaItems.filter((_, i) => i !== index)
    setMediaItems(newMediaItems)
  }

  const handleLogout = () => {
    logout()
    router.push("/gallery")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Media Gallery</h1>
        {isLoggedIn ? (
          <div className="flex gap-4">
            <Button
              onClick={() => setEditMode(!editMode)}
              className={`${editMode ? "bg-red-600" : "bg-green-600"} text-white`}
            >
              {editMode ? "Save Changes" : "Edit Gallery"}
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700">
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button className="bg-green-600 text-white hover:bg-green-700">Admin Login</Button>
          </Link>
        )}
      </div>

      {editMode && isLoggedIn && (
        <div className="mb-8 p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Upload New Media</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  value={newMedia.type}
                  onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as "image" | "video" })}
                >
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <Input
                  type="text"
                  value={newMedia.title}
                  onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">URL</label>
                <Input
                  type="text"
                  value={newMedia.url}
                  onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <Input
                  type="date"
                  value={newMedia.date}
                  onChange={(e) => setNewMedia({ ...newMedia, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-green-600 text-white">
              Upload Media
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              {item.type === "image" ? (
                <div className="relative w-full h-48">
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <video src={item.url} className="w-full h-48 object-cover" controls />
              )}
              {editMode && isLoggedIn && (
                <Button
                  onClick={() => handleDelete(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                {item.type === "image" ? (
                  <Image src="/placeholder.svg" alt="" width={16} height={16} className="w-4 h-4 mr-1" />
                ) : (
                  <Video className="w-4 h-4 mr-1" />
                )}
                <span className="capitalize">{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

