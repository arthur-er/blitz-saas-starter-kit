import { User } from "db"

import { Id } from "app/core/domain/valueObjects/id"

import { UserEntity } from "./userEntity"
import { Email } from "app/modules/users/domain/valueObjects/userEmail"
import { MembershipFactory, MembershipValue } from "app/modules/membership/domain/membershipFactory"

export type UserValue = User & {
  memberships?: MembershipValue[]
}

export class UserFactory {
  static fromRaw(values: UserValue): UserEntity {
    const { id, name, email, memberships } = values

    return new UserEntity({
      id: new Id(id),
      name,
      email: new Email(email),
      memberships: memberships
        ? memberships.map((membership) => MembershipFactory.fromRaw(membership))
        : undefined,
    })
  }
}
