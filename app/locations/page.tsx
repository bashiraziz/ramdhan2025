"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"

const initialLocations = [
  { name: "AKALO", masjid: "Masjid Al-Nur", households: 55 },
  { name: "ABELI", masjid: "Masjid Al-Rahma", households: 20 },
  { name: "ANAI", masjid: "Masjid Al-Huda", households: 70 },
  { name: "TE-JLWA", masjid: "Masjid Al-Iman", households: 30 },
  { name: "ADUKU", masjid: "Masjid Al-Taqwa", households: 35 },
  { name: "AGERI NONO", masjid: "Masjid Al-Baraka", households: 25 },
  { name: "ABWANG", masjid: "Masjid Al-Salam", households: 40 },
  { name: "OLIDUR", masjid: "Masjid Al-Fajr", households: 45 },
  { name: "ABEROLONGO", masjid: "Masjid Al-Ihsan", households: 25 },
  { name: "INOMO", masjid: "Masjid Al-Hidaya", households: 39 },
  { name: "ANGOLOWELO ABONGOMOLA", masjid: "Masjid Al-Aqsa", households: 28 },
  { name: "OLILO", masjid: "Masjid Al-Quds", households: 61 },
  { name: "OPEM", masjid: "Masjid Al-Furqan", households: 65 },
  { name: "TELELA", masjid: "Masjid Al-Noor", households: 45 },
  { name: "ZAMBIA", masjid: "Masjid Al-Rahman", households: 42 },
  { name: "CAM KWANI", masjid: "Masjid Al-Falah", households: 40 },
]

export default function LocationsPage() {
  const [locations, setLocations] = useState(initialLocations)
  const [editMode, setEditMode] = useState(false)
  const [newLocation, setNewLocation] = useState({ name: "", masjid: "", households: 0 })
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleEdit = (index: number, field: string, value: string | number) => {
    if (!isLoggedIn || !editMode) return

    const newLocations = [...locations]
    newLocations[index] = {
      ...newLocations[index],
      [field]: typeof value === "string" ? value : Number.parseInt(value.toString()),
    }
    setLocations(newLocations)
  }

  const handleAddLocation = () => {
    if (!isLoggedIn || !editMode) return

    if (newLocation.name && newLocation.masjid) {
      setLocations([...locations, newLocation])
      setNewLocation({ name: "", masjid: "", households: 0 })
    }
  }

  const handleDeleteLocation = (index: number) => {
    if (!isLoggedIn || !editMode) return

    const newLocations = locations.filter((_, i) => i !== index)
    setLocations(newLocations)
  }

  const handleLogout = () => {
    logout()
    router.push("/locations")
  }

  const totalHouseholds = locations.reduce((sum, location) => sum + location.households, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Distribution Locations</h1>
        {isLoggedIn ? (
          <div className="flex gap-4">
            <Button
              onClick={() => setEditMode(!editMode)}
              className={`${editMode ? "bg-red-600" : "bg-green-600"} text-white`}
            >
              {editMode ? "Save Changes" : "Edit Locations"}
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
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Add New Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Location Name"
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
            />
            <Input
              placeholder="Masjid Name"
              value={newLocation.masjid}
              onChange={(e) => setNewLocation({ ...newLocation, masjid: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Number of Households"
              value={newLocation.households || ""}
              onChange={(e) => setNewLocation({ ...newLocation, households: Number.parseInt(e.target.value) || 0 })}
            />
          </div>
          <Button onClick={handleAddLocation} className="mt-4 bg-green-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Location
          </Button>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Masjid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Households</th>
                {editMode && isLoggedIn && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editMode && isLoggedIn ? (
                      <Input value={location.name} onChange={(e) => handleEdit(index, "name", e.target.value)} />
                    ) : (
                      location.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editMode && isLoggedIn ? (
                      <Input value={location.masjid} onChange={(e) => handleEdit(index, "masjid", e.target.value)} />
                    ) : (
                      location.masjid
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {editMode && isLoggedIn ? (
                      <Input
                        type="number"
                        value={location.households}
                        onChange={(e) => handleEdit(index, "households", e.target.value)}
                        className="w-24"
                      />
                    ) : (
                      location.households
                    )}
                  </td>
                  {editMode && isLoggedIn && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <Button onClick={() => handleDeleteLocation(index)} className="bg-red-600 text-white">
                        <X className="w-4 h-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td colSpan={2} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  TOTAL HOUSEHOLDS
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{totalHouseholds}</td>
                {editMode && isLoggedIn && <td></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}