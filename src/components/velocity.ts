import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { Position } from "./position";

export class Velocity extends Component {

  x: number
  y: number
  position: Position

  constructor(entity: Entity, magnitude: Vector2 = (new Vector2())) {
    super(entity)
    if (!entity.hasComponentOfType(Position)) {
      throw new Error('Please add position component before velocity component');
    }

    this.position = entity.getComponentOfType(Position)
    this.x = magnitude.x
    this.y = magnitude.y
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    const velocitySum = this.x + this.y
    if (velocitySum == 0) {
      return
    }
    const dT = time - lastTime
    const mod = dT / 1000
    const dX = mod * this.x
    const dY = mod * this.y
    this.position.x += dX
    this.position.y += dY
  }
}