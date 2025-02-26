"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from "@/lib/auth"

type Donor = {
  name: string
  amount: number
}

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([])
  const [sortBy, setSortBy] = useState<"name" | "amount">("amount")
  const [newDonorName, setNewDonorName] = useState("")
  const [newDonorAmount, setNewDonorAmount] = useState("")
  const router = useRouter()
  const { isLoggedIn, logout, token } = useAuth()

  const fetchDonors = useCallback(async () => {
    try {
      const response = await fetch("/api/donors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to fetch donors: ${errorData.error || response.statusText}`)
      }

      const donorsData = await response.json()
      setDonors(donorsData)
    } catch (error) {
      console.error("Error fetching donors:", error)
      alert(`Failed to fetch donors: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }, [token])

  useEffect(() => {
    fetchDonors()
  }, [fetchDonors])

  const sortDonors = (by: "name" | "amount") => {
    const sorted = [...donors].sort((a, b) => {
      if (by === "name") {
        return a.name.localeCompare(b.name)
      } else {
        return b.amount - a.amount
      }
    })
    setDonors(sorted)
    setSortBy(by)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newDonorName && newDonorAmount && token) {
      try {
        const response = await fetch("/api/donors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: newDonorName,
            amount: Number.parseFloat(newDonorAmount),
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(`Failed to add donor: ${errorData.error || response.statusText}`)
        }

        const newDonor = await response.json()
        setNewDonorName("")
        setNewDonorAmount("")
        fetchDonors()
      } catch (error) {
        console.error("Error adding donor:", error)
        alert(`Failed to add donor: ${error instanceof Error ? error.message : "Unknown error"}`)
      }
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/donors")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Our Generous Donors</h1>
        {isLoggedIn ? (
          <Button onClick={handleLogout} className="bg-red-600 text-white hover:bg-red-700">
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button className="bg-green-600 text-white hover:bg-green-700">Admin Login</Button>
          </Link>
        )}
      </div>

      {isLoggedIn && (
        <div className="mb-8 p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Add New Pledge</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Donor Name
              </label>
              <Input
                type="text"
                id="name"
                value={newDonorName}
                onChange={(e) => setNewDonorName(e.target.value)}
                placeholder="Enter donor name"
                required
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Pledge Amount ($)
              </label>
              <Input
                type="number"
                id="amount"
                value={newDonorAmount}
                onChange={(e) => setNewDonorAmount(e.target.value)}
                placeholder="Enter pledge amount"
                required
                min="0"
                step="0.01"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
              Add Pledge
            </Button>
          </form>
        </div>
      )}

      <p className="text-gray-600 mb-4">
        We are grateful for the support of our donors. Their generosity helps us provide meals to those in need during
        Ramadan.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Note: All donors have consented to having their names and donation amounts displayed publicly.
      </p>
      <div className="mb-4">
        <span className="mr-2">Sort by:</span>
        <Button
          onClick={() => sortDonors("name")}
          className={`mr-2 ${sortBy === "name" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Name
        </Button>
        <Button
          onClick={() => sortDonors("amount")}
          className={sortBy === "amount" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}
        >
          Amount
        </Button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {donors.map((donor, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${donor.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

