import { HookableEvent } from "app/contract"
import { resolver } from "blitz"
import * as z from "zod"
import { webhooksRepository } from "../infra/webhooksRepository"

const CreateWebhookSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  url: z.string().url(),
  events: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(CreateWebhookSchema), async (input) => {
  const webhook = await webhooksRepository.createWebhook({
    ...input,
    events: input.events as HookableEvent[],
  })
  return webhook
})
