import { Id } from "app/core/domain/valueObjects/id"
import db, { Announcement } from "db"
import { AnnouncementFactory } from "../domain/announcementFactory"

interface CreateAnnouncementInput {
  name: string
  content: string
  description: string
}

interface UpdateAnnouncementInput {
  id: Id
  data: Partial<Announcement>
}

export const announcementsRepository = {
  async createAnnouncement(data: CreateAnnouncementInput) {
    const announcement = await db.announcement.create({
      data,
    })
    return announcement
  },
  // TODO: add pagination
  async getAnnouncements() {
    const announcements = await db.announcement.findMany({})
    const announcementEntities = announcements.map((announcement) =>
      AnnouncementFactory.fromRaw(announcement)
    )
    return announcementEntities
  },
  async getAnnouncement(id: Id) {
    const announcement = await db.announcement.findFirst({ where: { id: id.value } })
    if (announcement) {
      const announcementEntity = AnnouncementFactory.fromRaw(announcement)
      return announcementEntity
    }
  },
  async updateAnnouncement({ id, data }: UpdateAnnouncementInput) {
    const announcement = await db.announcement.update({
      where: { id: id.value },
      data,
    })
    const announcementEntity = AnnouncementFactory.fromRaw(announcement)
    return announcementEntity
  },
  async deleteAnnouncement(id: Id) {
    const announcement = await db.announcement.delete({ where: { id: id.value } })
    return announcement
  },
}
