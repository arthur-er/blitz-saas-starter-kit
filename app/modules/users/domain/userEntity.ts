import { Id } from "app/core/domain/valueObjects/id"
import { MembershipEntity } from "app/modules/membership/domain/membershipEntity"
import { Membership } from "db"
import { Email } from "./valueObjects/userEmail"

export interface IUserEntity {
  id: Id
  name: string
  email: Email
  memberships?: MembershipEntity[]
}

export class UserEntity implements IUserEntity {
  id: Id
  name: string
  email: Email
  memberships?: MembershipEntity[]

  constructor(props: IUserEntity) {
    this.id = new Id(props.id.value)
    this.name = props.name
    this.email = new Email(props.email.value)
    this.memberships = props.memberships ? props.memberships : undefined
    Object.freeze(this)
  }
}
