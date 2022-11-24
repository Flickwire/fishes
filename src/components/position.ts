import { Entity, Component } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";

export class Position extends Component {
  constructor(entity: Entity, x: number = 0, y: number = 0) {
    super(entity)
    entity.props.position = new Vector2(x, y)
  }
}