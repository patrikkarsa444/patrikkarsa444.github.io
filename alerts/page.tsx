"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "../layout"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export default function AlertsPage() {
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    const querySnapshot = await getDocs(collection(db, "announcements"))
    const fetchedAnnouncements = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setAnnouncements(fetchedAnnouncements)
  }

  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>Alerts and Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <p>No announcements at this time.</p>
          ) : (
            <ul className="space-y-2">
              {announcements.map((announcement) => (
                <li key={announcement.id} className="border p-2 rounded">
                  <p>{announcement.content}</p>
                  <small>{new Date(announcement.createdAt.seconds * 1000).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </Layout>
  )
}

