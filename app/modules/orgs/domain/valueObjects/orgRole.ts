import { GlobalRole as GlobalRoleEnum } from "db"
import * as z from "zod"

export const orgRoleSchema = z.enum([GlobalRoleEnum.CUSTOMER, GlobalRoleEnum.SUPERADMIN])

export type OrgRoleValue = z.infer<typeof orgRoleSchema>

export class OrgRole {
  constructor(public value: OrgRoleValue) {
    orgRoleSchema.parse(value)
    Object.freeze(this)
  }
}
