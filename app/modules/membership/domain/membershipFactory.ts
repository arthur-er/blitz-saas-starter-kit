import { Membership } from "db"

import { Id } from "app/core/domain/valueObjects/id"
import { UserFactory, UserValue } from "app/modules/users/domain/userFactory"

import { MembershipEntity } from "./membershipEntity"
import { OrgFactory, OrgValue } from "app/modules/orgs/domain/orgFactory"
import { Email } from "app/modules/users/domain/valueObjects/userEmail"
import { MembershipRole } from "./valueObjects/membershipRole"

export type MembershipValue = Membership & {
  user?: UserValue
  organization: OrgValue
}

export class MembershipFactory {
  static fromRaw(values: MembershipValue): MembershipEntity {
    const {
      id,
      role,
      user,
      userId,
      organization,
      organizationId,
      invitedEmail,
      invitedName,
    } = values

    return new MembershipEntity({
      id: new Id(id),
      role: new MembershipRole(role),
      organization: OrgFactory.fromRaw(organization),
      organizationId: new Id(organizationId),
      user: user ? UserFactory.fromRaw(user) : undefined,
      userId: userId ? new Id(userId) : undefined,
      invitedName: invitedName ? invitedName : undefined,
      invitedEmail: invitedEmail ? new Email(invitedEmail) : undefined,
    })
  }
}
