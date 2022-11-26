import { Entity, Component } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"

export class Position extends Component {

  vector: Vector2

  constructor(entity: Entity, vector = (new Vector2(0, 0))) {
    super(entity)
    this.vector = vector
  }
}