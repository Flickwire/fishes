import { Entity, Component } from "../engine/entity";

export class Name extends Component {
  constructor(entity: Entity, name: string) {
    super(entity)
    entity.props.name = name
  }
}