import { HookableEvent } from "app/contract"
import { Id } from "app/core/domain/valueObjects/id"
import { Url } from "./valueObjects/url"

export interface IWebHookEntity {
  id: Id
  name: string
  url: Url
  events: HookableEvent[]
}

export class WebhookEntity implements IWebHookEntity {
  id: Id
  name: string
  url: Url
  events: HookableEvent[]

  constructor(props: WebhookEntity) {
    this.id = new Id(props.id.value)
    this.name = props.name
    this.url = new Url(props.url.value)
    this.events = props.events
    Object.freeze(this)
  }
}
