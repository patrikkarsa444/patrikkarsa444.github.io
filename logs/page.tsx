"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "../layout"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, orderBy } from "firebase/firestore"

export default function LogsPage() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    const q = query(collection(db, "logs"), orderBy("timestamp", "desc"))
    const querySnapshot = await getDocs(q)
    const fetchedLogs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setLogs(fetchedLogs)
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Systemové Logy</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <p>No logs available.</p>
          ) : (
            <ul className="space-y-2">
              {logs.map((log) => (
                <li key={log.id} className="border p-2 rounded">
                  <p>
                    <strong>{log.action}</strong>
                  </p>
                  <p>Customer: {log.customerName}</p>
                  {log.transactionDetails && <p>Transaction: {JSON.stringify(log.transactionDetails)}</p>}
                  {log.newStatus && <p>New Status: {log.newStatus}</p>}
                  <small>{new Date(log.timestamp.seconds * 1000).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

