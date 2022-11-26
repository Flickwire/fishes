import { Entity, Component } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"

export class Facing extends Component {

  vector: Vector2

  constructor(entity: Entity, vector: Vector2 = (new Vector2(1,0))) {
    super(entity)
    if (vector.x === 0 && vector.y === 0) {
      throw new Error('Facing vector cannot be (0,0)');
    }
    this.vector = vector
  }
}