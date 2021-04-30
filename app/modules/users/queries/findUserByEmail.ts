import { resolver } from "blitz"
import * as z from "zod"
import { Email } from "../domain/valueObjects/userEmail"
import { usersRepository } from "../infra/usersRepository"

const CreateUserSchema = z.object({
  email: z.string().email(),
})

export default resolver.pipe(resolver.zod(CreateUserSchema), async (input) => {
  const email = new Email(input.email)
  const user = await usersRepository.getUserByEmail({ email })

  /* await ctx.session.$create({
    userId: user.id.value,
    orgId: user.memberships![0].organizationId.value,
    roles: [user.memberships![0].role.value!, user.memberships![0].organization.role.value!],
  }) */

  return user
})
