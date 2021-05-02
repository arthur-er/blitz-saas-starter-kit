import React from "react"
import { useLastAnnouncement } from "../hooks/useLastAnnouncement"

const Announcement: React.FC = () => {
  const announcement = useLastAnnouncement()
  if (!announcement) return null
  return (
    <div className="flex items-center justify-center w-full h-12 text-white bg-indigo-600">
      <div className="container">
        <div className="flex items-center justify-center w-full space-x-2 text-center">
          <p className="font-medium truncate">{announcement.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Announcement
