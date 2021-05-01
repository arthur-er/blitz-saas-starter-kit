import EnvProvider from "blitz-saas/core/Env"
import * as z from "zod"

export default new EnvProvider({
  FILESYSTEM_DRIVER: z.string(),
})
