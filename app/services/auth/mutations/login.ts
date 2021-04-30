import { resolver, SecurePassword, AuthenticationError } from "blitz"
import { Login } from "../validations"
import { usersRepository } from "app/modules/users/infra/usersRepository"
import { Email } from "app/modules/users/domain/valueObjects/userEmail"

export const authenticateUser = async (rawEmail: string, rawPassword: string) => {
  const email = new Email(rawEmail.toLowerCase().trim())
  const password = rawPassword.trim()
  const user = await usersRepository.getUserByEmail({ email })
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await usersRepository.updateUserPassword(user.id, improvedHash)
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)

  await ctx.session.$create({
    userId: user.id.value,
    orgId: user.memberships![0].organization.role.value,
    roles: [user.memberships![0].role.value, user.memberships![0].organization.role.value],
  })

  return user
})
