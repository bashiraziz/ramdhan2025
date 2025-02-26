"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

// Exchange rate (you might want to fetch this from an API)
const USD_TO_UGX = 3800;

type BudgetItem = {
  item: string;
  qty: number;
  population: number;
  totalKgs: number;
  rate: number;
  amount: number;
};

const initialBudgetItems: BudgetItem[] = [
  { item: "RICE", qty: 3.0, population: 700, totalKgs: 2100.0, rate: 3000, amount: 6300000.0 },
  { item: "POSO", qty: 3.0, population: 700, totalKgs: 2100.0, rate: 1900, amount: 3990000.0 },
  { item: "COOKING OIL", qty: 1.0, population: 700, totalKgs: 700.0, rate: 8000, amount: 5600000.0 },
  { item: "SUGAR", qty: 1.0, population: 700, totalKgs: 700.0, rate: 4300, amount: 3010000.0 },
  { item: "PACKING BAGS", qty: 4.0, population: 0, totalKgs: 0, rate: 4500, amount: 18000.0 },
];

export default function BudgetPage() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
  const [editMode, setEditMode] = useState(false);
  const [newItem, setNewItem] = useState<BudgetItem>({
    item: "",
    qty: 0,
    population: 0,
    totalKgs: 0,
    rate: 0,
    amount: 0,
  });

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const totalAmount = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const totalUSD = totalAmount / USD_TO_UGX;

  // ✅ Fixed `handleEdit` with type safety
  const handleEdit = <T extends keyof BudgetItem>(index: number, field: T, value: string | number) => {
    if (!isLoggedIn || !editMode) return;

    const newBudgetItems = [...budgetItems];
    const item = { ...newBudgetItems[index] };

    // Ensure the field value is correctly cast to the expected type
    item[field] = (typeof value === "string" ? Number.parseFloat(value) || 0 : value) as BudgetItem[T];

    // Recalculate totals if necessary
    if (field !== "amount") {
      if (item.qty && item.population) {
        item.totalKgs = item.qty * item.population;
      }
      if (item.totalKgs && item.rate) {
        item.amount = item.totalKgs * item.rate;
      }
    }

    newBudgetItems[index] = item;
    setBudgetItems(newBudgetItems);
  };

  const handleAddItem = () => {
    if (!isLoggedIn || !editMode) return;
    if (newItem.item) {
      setBudgetItems([...budgetItems, newItem]);
      setNewItem({ item: "", qty: 0, population: 0, totalKgs: 0, rate: 0, amount: 0 });
    }
  };

  const handleDeleteItem = (index: number) => {
    if (!isLoggedIn || !editMode) return;
    setBudgetItems(budgetItems.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    logout();
    router.push("/budget");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-800">Distribution Budget</h1>
        {isLoggedIn ? (
          <div className="flex gap-4">
            <Button
              onClick={() => setEditMode(!editMode)}
              className={`${editMode ? "bg-red-600" : "bg-green-600"} text-white`}
            >
              {editMode ? "Save Changes" : "Edit Budget"}
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

      {/* ✅ Display Total Budget in UGX and USD */}
      <div className="text-lg font-semibold text-gray-800 mt-4">
        Total Budget: {totalAmount.toLocaleString()} UGX ({totalUSD.toFixed(2)} USD)
      </div>

      {/* ✅ Add New Item Section */}
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

      {/* Table Code Goes Here */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Item</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Population</th>
              <th className="py-2">Total KGs</th>
              <th className="py-2">Rate</th>
              <th className="py-2">Amount</th>
              {editMode && <th className="py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {budgetItems.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.item}</td>
                <td className="border px-4 py-2">
                  {editMode ? (
                    <Input
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleEdit(index, "qty", e.target.value)}
                    />
                  ) : (
                    item.qty
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editMode ? (
                    <Input
                      type="number"
                      value={item.population}
                      onChange={(e) => handleEdit(index, "population", e.target.value)}
                    />
                  ) : (
                    item.population
                  )}
                </td>
                <td className="border px-4 py-2">{item.totalKgs}</td>
                <td className="border px-4 py-2">
                  {editMode ? (
                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) => handleEdit(index, "rate", e.target.value)}
                    />
                  ) : (
                    item.rate
                  )}
                </td>
                <td className="border px-4 py-2">{item.amount}</td>
                {editMode && (
                  <td className="border px-4 py-2">
                    <Button onClick={() => handleDeleteItem(index)} className="bg-red-600 text-white">
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}