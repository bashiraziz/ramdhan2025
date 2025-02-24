"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// Exchange rate (you might want to fetch this from an API)
const USD_TO_UGX = 3800

const initialBudgetItems = [
  { item: "RICE", qty: 3.0, population: 700, totalKgs: 2100.0, rate: 3000, amount: 6300000.0 },
  { item: "POSO", qty: 3.0, population: 700, totalKgs: 2100.0, rate: 1900, amount: 3990000.0 },
  { item: "COOKING OIL", qty: 1.0, population: 700, totalKgs: 700.0, rate: 8000, amount: 5600000.0 },
  { item: "SUGAR", qty: 1.0, population: 700, totalKgs: 700.0, rate: 4300, amount: 3010000.0 },
  { item: "PACKING BAGS", qty: 4.0, population: 0, totalKgs: 0, rate: 4500, amount: 18000.0 },
  { item: "TRANPORT within", qty: 5.0, population: 0, totalKgs: 0, rate: 10000, amount: 50000.0 },
  { item: "LABOUR FOR PACKING", qty: 0, population: 0, totalKgs: 0, rate: 20000, amount: 200000.0 },
  { item: "AIR TIME", qty: 0, population: 0, totalKgs: 0, rate: 0, amount: 40000.0 },
  { item: "VECHALE HIRE", qty: 0, population: 0, totalKgs: 0, rate: 0, amount: 500000.0 },
  { item: "FUEL DIESEL", qty: 70.0, population: 0, totalKgs: 0, rate: 4800, amount: 336000.0 },
  { item: "CONTIGENCY", qty: 1.0, population: 0, totalKgs: 0, rate: 200000, amount: 200000.0 },
]

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useState(initialBudgetItems)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newItem, setNewItem] = useState({ item: "", qty: 0, population: 0, totalKgs: 0, rate: 0, amount: 0 })

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    setIsLoggedIn(!!authToken)
  }, [])

  const totalAmount = budgetItems.reduce((sum, item) => sum + item.amount, 0)
  const totalUSD = totalAmount / USD_TO_UGX

  const handleEdit = (index: number, field: string, value: string | number) => {
    if (!isLoggedIn || !editMode) return

    const newBudgetItems = [...budgetItems]
    const item = { ...newBudgetItems[index] }

    // Update the field
    item[field as keyof typeof item] = typeof value === "string" ? Number.parseFloat(value) || 0 : value

    // Recalculate totals
    if (field !== "amount") {
      if (item.qty && item.population) {
        item.totalKgs = item.qty * item.population
      }
      if (item.totalKgs && item.rate) {
        item.amount = item.totalKgs * item.rate
      }
    }

    newBudgetItems[index] = item
    setBudgetItems(newBudgetItems)
  }

  const handleAddItem = () => {
    if (!isLoggedIn || !editMode) return

    if (newItem.item) {
      setBudgetItems([...budgetItems, newItem])
      setNewItem({ item: "", qty: 0, population: 0, totalKgs: 0, rate: 0, amount: 0 })
    }
  }

  const handleDeleteItem = (index: number) => {
    if (!isLoggedIn || !editMode) return

    const newBudgetItems = budgetItems.filter((_, i) => i !== index)
    setBudgetItems(newBudgetItems)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Distribution Budget</h1>
        {isLoggedIn ? (
          <Button
            onClick={() => setEditMode(!editMode)}
            className={`${editMode ? "bg-red-600" : "bg-green-600"} text-white`}
          >
            {editMode ? "Save Changes" : "Edit Budget"}
          </Button>
        ) : (
          <Link href="/login">
            <Button className="bg-green-600 text-white hover:bg-green-700">Admin Login</Button>
          </Link>
        )}
      </div>

      {editMode && isLoggedIn && (
        <div className="mb-8 p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800 mb-4">Add New Budget Item</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Input
              placeholder="Item Name"
              value={newItem.item}
              onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Qty"
              value={newItem.qty || ""}
              onChange={(e) => setNewItem({ ...newItem, qty: Number.parseFloat(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Population"
              value={newItem.population || ""}
              onChange={(e) => setNewItem({ ...newItem, population: Number.parseInt(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Total KGs"
              value={newItem.totalKgs || ""}
              onChange={(e) => setNewItem({ ...newItem, totalKgs: Number.parseFloat(e.target.value) || 0 })}
            />
            <Input
              type="number"
              placeholder="Rate"
              value={newItem.rate || ""}
              onChange={(e) => setNewItem({ ...newItem, rate: Number.parseFloat(e.target.value) || 0 })}
            />
            <Button onClick={handleAddItem} className="bg-green-600 text-white">
              Add Item
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty per person</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Population</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total KGs</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate (UGX)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (UGX)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (USD)</th>
                {editMode && isLoggedIn && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgetItems.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editMode && isLoggedIn ? (
                      <Input
                        value={item.item}
                        onChange={(e) => handleEdit(index, "item", e.target.value)}
                        className="w-full"
                      />
                    ) : (
                      item.item
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editMode && isLoggedIn ? (
                      <Input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleEdit(index, "qty", e.target.value)}
                        className="w-24"
                      />
                    ) : (
                      item.qty.toFixed(2)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editMode && isLoggedIn ? (
                      <Input
                        type="number"
                        value={item.population}
                        onChange={(e) => handleEdit(index, "population", e.target.value)}
                        className="w-24"
                      />
                    ) : (
                      item.population
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.totalKgs.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editMode && isLoggedIn ? (
                      <Input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleEdit(index, "rate", e.target.value)}
                        className="w-24"
                      />
                    ) : (
                      item.rate.toLocaleString()
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(item.amount / USD_TO_UGX).toFixed(2)}
                  </td>
                  {editMode && isLoggedIn && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button onClick={() => handleDeleteItem(index)} className="bg-red-600 text-white">
                        Delete
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  GRAND TOTAL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {totalAmount.toLocaleString()} UGX
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{totalUSD.toFixed(2)} USD</td>
                {editMode && isLoggedIn && <td></td>}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

