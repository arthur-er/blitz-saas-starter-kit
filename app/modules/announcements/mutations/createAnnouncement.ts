import { AuthorizationError, resolver } from "blitz"
import { GlobalRole } from "db"
import * as z from "zod"
import { announcementsRepository } from "../infra/announcementsRepository"

const CreateAnnouncementSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  content: z.string(),
  description: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateAnnouncementSchema),
  resolver.authorize(),
  async (data, ctx) => {
    if (!ctx.session.roles.includes(GlobalRole.SUPERADMIN))
      throw new AuthorizationError("Not allowed")
    const announcement = await announcementsRepository.createAnnouncement(data)

    return announcement
  }
)
