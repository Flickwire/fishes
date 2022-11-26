import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { Velocity } from "./velocity";

export class Drag extends Component {

  magnitude: number

  constructor(entity: Entity, magnitude: number = 0) {
    super(entity)
    if (!entity.hasComponentOfType(Velocity)) {
      throw new Error('Please add velocity component before drag component');
    }
    this.magnitude = magnitude
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    const velocity: Velocity = this.entity.getComponentOfType(Velocity)
    const dT = time - lastTime
    const mod = dT / 1000
    const dX = mod * velocity.x
    const dY = mod * velocity.y
    this.entity.props.position.x += dX
    this.entity.props.position.y += dY
  }
}