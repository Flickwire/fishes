import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { Position } from "./position";

export class Velocity extends Component {

  vector: Vector2
  position: Position

  constructor(entity: Entity, vector: Vector2 = (new Vector2())) {
    super(entity)
    if (!entity.hasComponentOfType(Position)) {
      throw new Error('Please add position component before velocity component');
    }

    this.position = entity.getComponentOfType(Position)
    this.vector = vector
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.vector.x === 0 && this.vector.y === 0) {
      return
    }
    const dT = time - lastTime
    const mod = dT / 1000
    const dX = mod * this.vector.x
    const dY = mod * this.vector.y
    this.position.vector.x += dX
    this.position.vector.y += dY
  }
}