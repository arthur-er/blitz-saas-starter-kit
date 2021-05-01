import { Prisma } from "db"

type EventActions = "create" | "update" | "delete"
export type HookableEvent = `${EventActions}:${Lowercase<Prisma.ModelName>}`
export type HookableEventData = Record<HookableEvent, { data: Record<string, any> }>
