import { Entity, Component } from "../engine/entity";

export class Color extends Component {
  constructor(entity: Entity, name: string) {
    super(entity)
    entity.props.name = name
  }
}