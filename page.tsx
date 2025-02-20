"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore"

export default function HomePage() {
  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newAnnouncement.trim() === "") return

    await addDoc(collection(db, "announcements"), {
      content: newAnnouncement,
      createdAt: Timestamp.now(),
    })

    setNewAnnouncement("")
    fetchAnnouncements()
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Customer Management System</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Select an option from the sidebar to manage customer information, verify IDs, check customer ranks, and
            more.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bulletin Board</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="mb-4">
            <Input
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Enter new announcement"
              className="mb-2"
            />
            <Button type="submit">Post Announcement</Button>
          </form>
          <ul className="space-y-2">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="border p-2 rounded">
                <p>{announcement.content}</p>
                <small>{new Date(announcement.createdAt.seconds * 1000).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

