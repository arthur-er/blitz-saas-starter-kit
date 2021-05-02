import { announcementsRepository } from "../infra/announcementsRepository"

const getAnnouncements = async () => {
  const announcement = await announcementsRepository.getAnnouncements()

  return announcement
}

export default getAnnouncements
