import Emittery from "emittery"
import fetch from "isomorphic-unfetch"
import { EventsList } from "app/contract"
import { webhooksRepository } from "app/modules/webhooks/infra/webhooksRepository"

export const Events = new Emittery<EventsList>()

