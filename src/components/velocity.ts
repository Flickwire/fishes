import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { Position } from "./position";

export class Velocity extends Component {

  x: number
  y: number

  constructor(entity: Entity, magnitude: Vector2 = (new Vector2())) {
    super(entity)
    if (!entity.hasComponentOfType(Position)) {
      throw new Error('Please add position component before velocity component');
    }

    this.x = magnitude.x
    this.y = magnitude.y
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    const velocitySum = this.x + this.y
    if (velocitySum == 0) {
      return
    }
    const position: Position = this.entity.getComponentOfType(Position)
    const dT = time - lastTime
    const mod = dT / 1000
    const dX = mod * this.x
    const dY = mod * this.y
    position.x += dX
    position.y += dY
  }
}