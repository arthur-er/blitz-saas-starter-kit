import { useQuery } from "blitz"
import getAnnouncements from "../queries/getAnnouncements"

export const useLastAnnouncement = () => {
  const [announcements] = useQuery(getAnnouncements, undefined)
  const lastAnnouncement = announcements.pop()
  return lastAnnouncement
}
