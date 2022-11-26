import { Entity, Component } from "../engine/entity";

export class Name extends Component {

  name: string

  constructor(entity: Entity, name: string) {
    super(entity)
    this.name = name
  }
}