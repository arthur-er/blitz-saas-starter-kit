import { Email } from "app/modules/users/domain/valueObjects/userEmail"
import { resolver, generateToken, hash256 } from "blitz"
import db from "db"
import { forgotPasswordMailer } from "mailers/forgotPasswordMailer"
import { usersRepository } from "app/modules/users/infra/usersRepository"
import { ForgotPassword } from "../validations"

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4

export default resolver.pipe(resolver.zod(ForgotPassword), async ({ email: rawEmail }) => {
  // 1. Get the user
  const email = new Email(rawEmail)
  const user = await usersRepository.getUserByEmail({ email })

  // 2. Generate the token and expiration date.
  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS)

  // 3. If user with this email was found
  if (user) {
    // FIXME: Create tokens repository
    // 4. Delete any existing password reset tokens
    await db.token.deleteMany({ where: { type: "RESET_PASSWORD", userId: user.id.value } })
    // 5. Save this new token in the database.
    await db.token.create({
      data: {
        user: { connect: { id: user.id.value } },
        type: "RESET_PASSWORD",
        expiresAt,
        hashedToken,
        sentTo: user.email.value,
      },
    })
    // 6. Send the email
    await forgotPasswordMailer({ to: user.email.value, token }).send()
  } else {
    // 7. If no user found wait the same time so attackers can't tell the difference
    await new Promise((resolve) => setTimeout(resolve, 750))
  }

  // 8. Return the same result whether a password reset email was sent or not
  return
})
