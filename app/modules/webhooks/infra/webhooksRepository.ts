import { HookableEvent } from "app/contract"
import { Id } from "app/core/domain/valueObjects/id"
import db, { Webhook } from "db"
import { WebhookFactory } from "../domain/webhookFactory"

interface CreateWebhookInput {
  events: HookableEvent[]
  name: string
  url: string
}

interface UpdateWebhookInput {
  id: Id
  data: Partial<Webhook>
}
export const webhooksRepository = {
  async createWebhook(data: CreateWebhookInput) {
    const webhook = await db.webhook.create({
      data: data,
    })
    return webhook
  },
  // TODO: add pagination
  async getWebhooks() {
    const webhooks = await db.webhook.findMany({})
    const webhookEntities = webhooks.map((webhook) => WebhookFactory.fromRaw(webhook))
    return webhookEntities
  },
  async getWebhook(id: Id) {
    const webhook = await db.webhook.findFirst({ where: { id: id.value } })
    return webhook
  },
  async updateWebhook({ id, data }: UpdateWebhookInput) {
    const webhook = await db.webhook.update({
      where: { id: id.value },
      data,
    })
    return webhook
  },
  async deleteWebhook(id: Id) {
    const webhook = await db.webhook.delete({ where: { id: id.value } })
    return webhook
  },
}
