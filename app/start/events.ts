import Emittery from "emittery"
import fetch from "isomorphic-unfetch"
import { EventsContract } from "app/contract"
import { webhooksRepository } from "app/modules/webhooks/infra/webhooksRepository"

export const Events = new Emittery<EventsContract>()

const registerWebhookEvents = async () => {
  const webhooks = await webhooksRepository.getWebhooks()
  webhooks.forEach((webhook) => {
    Events.on(webhook.events, ({ data }) => {
      fetch(webhook.url.value, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    })
  })
}

registerWebhookEvents()
