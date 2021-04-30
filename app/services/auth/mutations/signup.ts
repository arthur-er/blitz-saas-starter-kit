import { resolver } from "blitz"
import { Signup } from "../validations"
import createUser from "app/modules/users/mutations/createUser"

export default resolver.pipe(resolver.zod(Signup), async (input, ctx) => {
  const user = await createUser(input, ctx)
  await ctx.session.$create({
    userId: user.id.value,
    orgId: user.memberships![0].organization.role.value,
    roles: [user.memberships![0].role.value, user.memberships![0].organization.role.value],
  })
  return user
})
