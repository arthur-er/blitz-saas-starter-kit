import { Id } from "app/core/domain/valueObjects/id"
import { IOrgEntity, OrgEntity } from "app/modules/orgs/domain/orgEntity"
import { IUserEntity, UserEntity } from "app/modules/users/domain/userEntity"
import { Email } from "app/modules/users/domain/valueObjects/userEmail"
import { MembershipRole } from "./valueObjects/membershipRole"

export interface IMembershipEntity {
  id: Id
  role: MembershipRole
  organization: IOrgEntity
  organizationId: Id
  user?: IUserEntity
  userId?: Id
  invitedName?: string
  invitedEmail?: Email
}

export class MembershipEntity implements IMembershipEntity {
  id: Id
  role: MembershipRole
  organization: IOrgEntity
  organizationId: Id
  user?: IUserEntity
  userId?: Id
  invitedName?: string
  invitedEmail?: Email

  constructor(props: IMembershipEntity) {
    this.id = new Id(props.id.value)
    this.role = new MembershipRole(props.role.value)
    this.organization = new OrgEntity(props.organization)
    this.organizationId = new Id(props.organizationId.value)
    this.invitedName = props.invitedName
    this.invitedEmail = props.invitedEmail && new Email(props.invitedEmail.value)
    this.user = props.user && new UserEntity(props.user)
    this.userId = props.userId && new Id(props.userId.value)
    Object.freeze(this)
  }
}
