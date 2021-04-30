import { Id } from "app/core/domain/valueObjects/id"
import { MembershipEntity } from "app/modules/membership/domain/membershipEntity"
import { Email } from "./valueObjects/userEmail"

export interface IUserEntity {
  id: Id
  name: string
  email: Email
  hashedPassword?: string
  memberships?: MembershipEntity[]
}

export class UserEntity implements IUserEntity {
  id: Id
  name: string
  email: Email
  memberships?: MembershipEntity[]
  hashedPassword?: string

  constructor(props: IUserEntity) {
    this.id = new Id(props.id.value)
    this.name = props.name
    this.hashedPassword = props.hashedPassword
    this.email = new Email(props.email.value)
    this.memberships = props.memberships ? props.memberships : undefined
    Object.freeze(this)
  }
}
