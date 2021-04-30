import { Webhook } from "db"

import { Id } from "app/core/domain/valueObjects/id"

import { WebhookEntity } from "./webhookEntity"
import { Url } from "./valueObjects/url"
import { HookableEvent } from "app/contract"

export type WebhookValue = Omit<Webhook, "createdAt" | "updatedAt">

export class WebhookFactory {
  static fromRaw(values: WebhookValue): WebhookEntity {
    const { id, name, url, events } = values

    return new WebhookEntity({
      id: new Id(id),
      name,
      url: new Url(url),
      events: events as HookableEvent[],
    })
  }
}
