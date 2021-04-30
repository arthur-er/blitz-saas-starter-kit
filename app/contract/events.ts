import { Id } from "app/core/domain/valueObjects/id"
import { Prisma } from "db"

type EventActions = "create" | "update" | "delete"
export type HookableEvent = `${EventActions}:${Lowercase<Prisma.ModelName>}`

export interface EventsList extends Record<HookableEvent, { data: Record<string, any> }> {
  "new:user": { id: Id }
}
