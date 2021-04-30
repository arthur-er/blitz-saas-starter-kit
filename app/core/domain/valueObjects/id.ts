import * as z from "zod"

export const idSchema = z.string().uuid()

export type IdValue = z.infer<typeof idSchema>

export class Id {
  constructor(public value: IdValue) {
    idSchema.parse(value)
    Object.freeze(this)
  }
}
