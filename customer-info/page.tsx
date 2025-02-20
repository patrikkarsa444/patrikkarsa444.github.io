"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CustomerProfile from "@/components/CustomerProfile"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore"

export default function CustomerInfoPage() {
  const [customers, setCustomers] = useState([])
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    customerNumber: "",
    customerStatus: "",
  })
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "customers"))
    const fetchedCustomers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setCustomers(fetchedCustomers)
  }

  const handleInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const customerData = {
      ...newCustomer,
      createdAt: Timestamp.now(),
    }
    await addDoc(collection(db, "customers"), customerData)
    await addDoc(collection(db, "logs"), {
      action: "Created new customer profile",
      customerName: newCustomer.name,
      timestamp: Timestamp.now(),
    })
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      dateOfBirth: "",
      customerNumber: "",
      customerStatus: "",
    })
    fetchCustomers()
  }

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer)
  }

  const handleAddTransaction = async (customerId, transaction) => {
    const customerRef = doc(db, "customers", customerId)
    await updateDoc(customerRef, {
      transactions: [...(selectedCustomer.transactions || []), transaction],
    })
    await addDoc(collection(db, "logs"), {
      action: "Added new transaction",
      customerName: selectedCustomer.name,
      transactionDetails: transaction,
      timestamp: Timestamp.now(),
    })
    setSelectedCustomer({
      ...selectedCustomer,
      transactions: [...(selectedCustomer.transactions || []), transaction],
    })
  }

  const handleUpdateTransactionStatus = async (customerId, transactionIndex, newStatus) => {
    const customerRef = doc(db, "customers", customerId)
    const updatedTransactions = [...selectedCustomer.transactions]
    updatedTransactions[transactionIndex].status = newStatus
    await updateDoc(customerRef, {
      transactions: updatedTransactions,
    })
    await addDoc(collection(db, "logs"), {
      action: "Updated transaction status",
      customerName: selectedCustomer.name,
      transactionDetails: updatedTransactions[transactionIndex],
      newStatus: newStatus,
      timestamp: Timestamp.now(),
    })
    setSelectedCustomer({
      ...selectedCustomer,
      transactions: updatedTransactions,
    })
  }

  return (
    <div className="grid gap-6">
      {selectedCustomer ? (
        <>
          <Button onClick={() => setSelectedCustomer(null)}>Back to Customer List</Button>
          <CustomerProfile
            customer={selectedCustomer}
            onAddTransaction={handleAddTransaction}
            onUpdateTransactionStatus={handleUpdateTransactionStatus}
          />
        </>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Add New Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={newCustomer.name} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newCustomer.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={newCustomer.phone} onChange={handleInputChange} required />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={newCustomer.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    value={newCustomer.gender}
                    onValueChange={(value) => handleInputChange({ target: { name: "gender", value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muž">Muž</SelectItem>
                      <SelectItem value="žena">Žena</SelectItem>
                      <SelectItem value="other">Iné</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateOfBirth">Dátum narodenia</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={newCustomer.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerNumber">Zákaznícke číslo</Label>
                  <Input
                    id="customerNumber"
                    name="customerNumber"
                    value={newCustomer.customerNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerStatus">Zákaznícky status</Label>
                  <Input
                    id="customerStatus"
                    name="customerStatus"
                    value={newCustomer.customerStatus}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit">Pridať zákazníka</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>List všetkých zákazníkov</CardTitle>
            </CardHeader>
            <CardContent>
              {customers.length === 0 ? (
                <p>No customers added yet.</p>
              ) : (
                <ul className="space-y-2">
                  {customers.map((customer) => (
                    <li
                      key={customer.id}
                      className="border p-2 rounded cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCustomerClick(customer)}
                    >
                      <strong>{customer.name}</strong> - {customer.email} - {customer.phone}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

