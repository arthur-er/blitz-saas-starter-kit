import { Announcement } from "db"

import { Id } from "app/core/domain/valueObjects/id"
import { AnnouncementEntity } from "./announcementEntity"

export type AnnouncementValue = Omit<Announcement, "createdAt" | "updatedAt">

export class AnnouncementFactory {
  static fromRaw(values: AnnouncementValue): AnnouncementEntity {
    const { id, name, content, description } = values

    return new AnnouncementEntity({
      id: new Id(id),
      name,
      content,
      description,
    })
  }
}
