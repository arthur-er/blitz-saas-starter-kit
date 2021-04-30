import Emittery from "emittery"
import fetch from "isomorphic-unfetch"
import { EventsList } from "app/contract"
import { webhooksRepository } from "app/modules/webhooks/infra/webhooksRepository"

export const Events = new Emittery<EventsList>()

const registerWebhookEvents = async () => {
  const webhooks = await webhooksRepository.getWebhooks()
  webhooks.forEach((webhook) => {
    Events.on(webhook.events, ({ url, data }) => {
      fetch(url, {
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
