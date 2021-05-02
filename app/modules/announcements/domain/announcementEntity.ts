import { Id } from "app/core/domain/valueObjects/id"

export interface IAnnouncementEntity {
  id: Id
  name: string
  description: string
  content: string
}

export class AnnouncementEntity implements IAnnouncementEntity {
  id: Id
  name: string
  description: string
  content: string

  constructor(props: IAnnouncementEntity) {
    this.id = new Id(props.id.value)
    this.name = props.name
    this.description = props.description
    this.content = props.content
    Object.freeze(this)
  }
}
