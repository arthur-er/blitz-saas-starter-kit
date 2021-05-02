import { NotFoundError, resolver, AuthorizationError } from "blitz"
import { Id } from "app/core/domain/valueObjects/id"
import * as z from "zod"
import { announcementsRepository } from "../infra/announcementsRepository"
import { GlobalRole } from "db"

const announcementUpdateSchema = z.object({
  id: z.string().uuid(),
})

export default resolver.pipe(
  resolver.zod(announcementUpdateSchema),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    if (!ctx.session.roles.includes(GlobalRole.SUPERADMIN))
      throw new AuthorizationError("Not allowed")
    const announcementId = new Id(id)
    const announcement = await announcementsRepository.getAnnouncement(announcementId)
    if (!announcement) throw new NotFoundError()

    await announcementsRepository.updateAnnouncement({ id: announcementId, data })
    return true
  }
)
