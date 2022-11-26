import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Velocity } from "./velocity";

export class Drag extends Component {

  magnitude: number
  velocity: Velocity

  constructor(entity: Entity, magnitude: number = 0) {
    super(entity)
    if (!entity.hasComponentOfType(Velocity)) {
      throw new Error('Please add velocity component before drag component');
    }
    this.magnitude = magnitude
    this.velocity = this.entity.getComponentOfType(Velocity)
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.velocity.vector.x === 0 && this.velocity.vector.y === 0) {
      return
    }
    const normal = this.velocity.vector.normalise()
    const dT = time - lastTime
    const mod = dT / 1000
    const timeCorrectedMagnitude = mod * this.magnitude
    var newX = this.velocity.vector.x - (timeCorrectedMagnitude * normal.x)
    var newY = this.velocity.vector.y - (timeCorrectedMagnitude * normal.y)
    if (newX > 0 && this.velocity.vector.x < 0 || newX < 0 && this.velocity.vector.x > 0) {
      newX = 0
    }
    if (newY > 0 && this.velocity.vector.y < 0 || newY < 0 && this.velocity.vector.y > 0) {
      newY = 0
    }
    this.velocity.vector.x = newX
    this.velocity.vector.y = newY
  }
}