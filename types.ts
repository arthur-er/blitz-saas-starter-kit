import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User, MembershipRole, GlobalRole, Organization } from "db"
declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<MembershipRole>
    PublicData: {
      userId: User["id"]
      roles: Array<MembershipRole & GlobalRole>
    }
  }
}
