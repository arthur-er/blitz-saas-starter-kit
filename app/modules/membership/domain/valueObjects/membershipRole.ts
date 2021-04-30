import { MembershipRole as MembershipRoleEnum } from "db"
import * as z from "zod"

export const membershipRoleSchema = z.enum([
  MembershipRoleEnum.OWNER,
  MembershipRoleEnum.ADMIN,
  MembershipRoleEnum.USER,
])

export type MembershipRoleValue = z.infer<typeof membershipRoleSchema>

export class MembershipRole {
  constructor(public value: MembershipRoleValue) {
    membershipRoleSchema.parse(value)
    Object.freeze(this)
  }
}
