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
    const velocitySum = this.velocity.x + this.velocity.y
    if (velocitySum == 0) {
      return
    }
    const dT = time - lastTime
    const mod = dT / 1000
    const timeCorrectedMagnitude = mod * this.magnitude
    const propX = this.velocity.x / velocitySum
    const propY = this.velocity.y / velocitySum
    var newX = this.velocity.x - (timeCorrectedMagnitude * propX)
    var newY = this.velocity.y - (timeCorrectedMagnitude * propY)
    if (newX > 0 && this.velocity.x < 0 || newX < 0 && this.velocity.x > 0) {
      newX = 0
    }
    if (newY > 0 && this.velocity.y < 0 || newY < 0 && this.velocity.y > 0) {
      newY = 0
    }
    this.velocity.x = newX
    this.velocity.y = newY
  }
}