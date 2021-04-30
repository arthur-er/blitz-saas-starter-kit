import { Membership, Organization } from "db"

import { Id } from "app/core/domain/valueObjects/id"

import { OrgEntity } from "./orgEntity"
import { OrgRole } from "./valueObjects/orgRole"

export type OrgValue = Organization & {
  memberships?: Membership[]
}

export class OrgFactory {
  static fromRaw(values: OrgValue): OrgEntity {
    const { id, name, role, memberships } = values

    return new OrgEntity({
      id: new Id(id),
      name: name,
      role: new OrgRole(role),
      memberships: memberships,
    })
  }
}
