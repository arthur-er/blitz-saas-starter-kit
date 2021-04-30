import { Id } from "app/core/domain/valueObjects/id"
import { Membership } from "db"
import { OrgRole } from "./valueObjects/orgRole"

export interface IOrgEntity {
  id: Id
  name: string
  role: OrgRole
  memberships?: Membership[]
}

export class OrgEntity implements IOrgEntity {
  id: Id
  name: string
  memberships?: Membership[]
  role: OrgRole

  constructor(props: IOrgEntity) {
    this.id = new Id(props.id.value)
    this.name = props.name
    this.memberships = props.memberships ? props.memberships : undefined
    this.role = new OrgRole(props.role.value)
    Object.freeze(this)
  }
}
