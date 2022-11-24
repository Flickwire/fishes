import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { Position } from "./position";

export class Velocity extends Component {
  constructor(entity: Entity, magnitude: Vector2 = (new Vector2())) {
    super(entity)
    if (!entity.hasComponentOfType(Position)) {
      throw new Error('Please add position component before velocity component');
    }
    entity.props.velocity = magnitude
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    const velocity: Vector2 = this.entity.props.velocity
    const dT = time - lastTime
    const mod = dT / 1000
    const dX = mod * velocity.x
    const dY = mod * velocity.y
    this.entity.props.position.x += dX
    this.entity.props.position.y += dY
  }
}