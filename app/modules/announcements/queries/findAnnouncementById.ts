import { resolver } from "blitz"
import * as z from "zod"
import { announcementsRepository } from "../infra/announcementsRepository"
import { Id } from "app/core/domain/valueObjects/id"

const announcementFindSchema = z.object({
  id: z.string().uuid(),
})

export default resolver.pipe(resolver.zod(announcementFindSchema), async (input) => {
  const id = new Id(input.id)
  const announcement = await announcementsRepository.getAnnouncement(id)

  return announcement
})
