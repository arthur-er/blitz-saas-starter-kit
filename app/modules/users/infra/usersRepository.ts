import { SecurePassword } from "@blitzjs/core/server"
import { Id } from "app/core/domain/valueObjects/id"
import db, { User } from "db"
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
  async getUserById(id: Id) {
    const user = await db.user.findFirst({ where: { id: id.value } })
    return user
  },
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
      include: {
        memberships: {
          include: {
            organization: true,
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
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    })

    const userEntity = UserFactory.fromRaw(user)

    return userEntity
  },

  async getUserByEmail({ email }: GetUserByEmailInput) {
    const user = await db.user.findFirst({
      where: { email: email.value },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    })
    if (!user) {
      return
    }
    const userEntity = UserFactory.fromRaw(user)

    return userEntity
  },

  async updateUser(userId: Id, values: Partial<Omit<User, "hashedPassword">>) {
    const updatedUser = await db.user.update({ where: { id: userId.value }, data: values })

    return updatedUser
  },

  async updateUserPassword(userId: Id, newPassword: string) {
    const updatedUser = await db.user.update({
      where: { id: userId.value },
      data: {
        hashedPassword: await SecurePassword.hash(newPassword.trim()),
      },
    })
    return updatedUser
  },
}
