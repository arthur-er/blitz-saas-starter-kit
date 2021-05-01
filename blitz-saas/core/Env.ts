import { EnvContract } from "app/contract/env"

import * as z from "zod"

export default class Env {
  private static instance: Env
  private envCache: Record<keyof EnvContract, z.infer<EnvContract[keyof EnvContract]>>

  constructor(private validationSchema: EnvContract) {
    if (!Env.instance) {
      Env.instance = new Env(validationSchema)
    }
    return Env.instance
  }

  public get(key: keyof EnvContract, defaultValue?: EnvContract[keyof EnvContract]) {
    if (this.envCache[key] !== undefined) {
      return this.envCache[key]
    }

    const envValue = process.env[key]
    if (envValue) {
      const processedValue = this.validationSchema[key].parse(envValue)
      this.envCache[key] = processedValue
      return processedValue
    }

    return defaultValue
  }
}
