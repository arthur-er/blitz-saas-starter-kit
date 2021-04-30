import { resolver } from "blitz"
import * as z from "zod"
import { Email } from "../domain/valueObjects/userEmail"
import { usersRepository } from "../infra/usersRepository"

const password = z.string().min(10).max(100)

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password,
  orgName: z.string().min(3).max(30),
})

export default resolver.pipe(resolver.zod(CreateUserSchema), async (input) => {
  const email = new Email(input.email)
  const user = await usersRepository.createUser({ ...input, email })

  /* await ctx.session.$create({
    userId: user.id.value,
    orgId: user.memberships![0].organizationId.value,
    roles: [user.memberships![0].role.value!, user.memberships![0].organization.role.value!],
  }) */

  return user
})
