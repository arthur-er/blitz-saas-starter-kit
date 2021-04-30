import { NotFoundError, resolver } from "blitz"
import { authenticateUser } from "./login"
import { ChangePassword } from "../validations"
import { usersRepository } from "app/modules/users/infra/usersRepository"
import { Id } from "app/core/domain/valueObjects/id"

export default resolver.pipe(
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    const userId = new Id(ctx.session.userId)
    const user = await usersRepository.getUserById(userId)
    if (!user) throw new NotFoundError()

    await authenticateUser(user.email, currentPassword)
    await usersRepository.updateUserPassword(userId, newPassword)
    return true
  }
)
