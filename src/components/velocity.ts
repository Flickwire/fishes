import { Component, ComponentProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"

export class Velocity implements Component {

  birthday: number
  age: number

  constructor(entity: Entity, magnitude: Vector2 = (new Vector2())) {
    if (!(entity.getProp('position',0) instanceof Vector2)) {
      throw new Error('Please add position component before velocity component');
    }
    entity.props.velocity = magnitude
  }

  update({ time, entity, lastTime }: ComponentProps): void {
    const velocity: Vector2 = entity.props.velocity
    const dT = time - lastTime
    const mod = dT / 1000
    const dX = mod * velocity.x
    const dY = mod * velocity.y
    entity.props.position.x += dX
    entity.props.position.y += dY
  }
}