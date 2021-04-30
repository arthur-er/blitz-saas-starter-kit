import { SecurePassword } from "@blitzjs/core/server"
import { Id } from "app/core/domain/valueObjects/id"
import db from "db"
import { UserFactory } from "../domain/userFactory"
import { Email } from "../domain/valueObjects/userEmail"

interface CreateUserInput {
  name: string
  email: Email
  password: string
  orgName: string
}

interface CreateUserWithoutOrg {
  name: string
  email: Email
  password: string
  orgId: Id
}

interface GetUserByEmailInput {
  email: Email
}

export const usersRepository = {
  async createUser(input: CreateUserInput) {
    const user = await db.user.create({
      data: {
        email: input.email.value,
        name: input.name,
        hashedPassword: await SecurePassword.hash(input.password.trim()),
        memberships: {
          create: {
            role: "OWNER",
            organization: {
              create: {
                name: input.orgName,
                role: "CUSTOMER",
              },
            },
          },
        },
      },
    })

    const userEntity = UserFactory.fromRaw(user)

    return userEntity
  },

  async createUserWithoutOrg(input: CreateUserWithoutOrg) {
    const user = await db.user.create({
      data: {
        email: input.email.value,
        name: input.name,
        hashedPassword: await SecurePassword.hash(input.password.trim()),
        memberships: {
          create: {
            role: "USER",
            organizationId: input.orgId.value,
          },
        },
      },
    })

    const userEntity = UserFactory.fromRaw(user)

    return userEntity
  },

  async getUserByEmail({ email }: GetUserByEmailInput) {
    const user = await db.user.findFirst({ where: { email: email.value } })
    if (!user) {
      return
    }

    const userEntity = UserFactory.fromRaw(user)

    return userEntity
  },
}
