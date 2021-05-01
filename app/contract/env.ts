import type BaseEnv from "blitz-saas/contract/env"
import * as z from "zod"

// Register the env variables your app needs here
export interface EnvContract extends BaseEnv {
  FILESYSTEM_DRIVER: z.ZodString
}
