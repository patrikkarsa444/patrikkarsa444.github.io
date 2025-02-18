"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CustomerProfileProps {
  customer: {
    id: string
    gender: string
    dateOfBirth: string
    customerNumber: string
    customerStatus: string
    address: string
    name: string
    phoneNumber: string
    transactions?: Array<{
      date: string
      description: string
      amount: number
      status: "paid" | "unpaid"
    }>
  }
  onAddTransaction: (customerId: string, transaction: any) => void
  onUpdateTransactionStatus: (customerId: string, transactionIndex: number, newStatus: "paid" | "unpaid") => void
}

export default function CustomerProfile({
  customer,
  onAddTransaction,
  onUpdateTransactionStatus,
}: CustomerProfileProps) {
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    status: "unpaid" as "paid" | "unpaid",
  })

  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddTransaction(customer.id, {
      ...newTransaction,
      amount: Number.parseFloat(newTransaction.amount),
    })
    setNewTransaction({
      date: "",
      description: "",
      amount: "",
      status: "unpaid",
    })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Customer Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Pohlavie</span>
              <span>{customer.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dátum narodenia</span>
              <span>{customer.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Zákaznícke číslo</span>
              <span>{customer.customerNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Zákaznícky status</span>
              <span>{customer.customerStatus}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-gray-600">Adresa</span>
              <span>{customer.address}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-gray-600">Meno a priezvisko</span>
              <span>{customer.name}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-gray-600">Telefónne číslo</span>
              <span>{customer.phoneNumber}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Zoznam zmluvných transakcií</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="date">Dátum</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={newTransaction.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Popis</Label>
                <Input
                  id="description"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount">Suma</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  name="status"
                  value={newTransaction.status}
                  onValueChange={(value) => handleInputChange({ target: { name: "status", value } })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Zaplatené</SelectItem>
                    <SelectItem value="unpaid">Nezaplatené</SelectItem>
                    <SelectItem value="zrusene">Zrušené</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Pridať transakciu</Button>
            </form>

            <div className="border rounded-lg">
              {customer.transactions &&
                customer.transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 p-3 hover:bg-gray-50 border-t first:border-t-0"
                  >
                    <div>
                      <div className="text-sm font-medium">{transaction.description}</div>
                      <div className="text-xs text-gray-500">{transaction.date}</div>
                      <div className="text-xs">Amount: ${transaction.amount.toFixed(2)}</div>
                    </div>
                    <Select
                      value={transaction.status}
                      onValueChange={(value) =>
                        onUpdateTransactionStatus(customer.id, index, value as "paid" | "unpaid")
                      }
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="unpaid">Unpaid</SelectItem>
                        <SelectItem value="zrusene">Zrušené</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

