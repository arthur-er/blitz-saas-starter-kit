import * as z from "zod"

export const emailSchema = z.string().email()

export type EmailValue = z.infer<typeof emailSchema>

export class Email {
  constructor(public value: EmailValue) {
    emailSchema.parse(value)
    Object.freeze(this)
  }
}
