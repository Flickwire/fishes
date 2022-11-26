import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
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
    const velocitySum = velocity.x + velocity.y
    if (velocitySum == 0) {
      return
    }
    const dT = time - lastTime
    const mod = dT / 1000
    const timeCorrectedMagnitude = mod * this.magnitude
    const propX = velocity.x / velocitySum
    const propY = velocity.y / velocitySum
    var newX = velocity.x - (timeCorrectedMagnitude * propX)
    var newY = velocity.y - (timeCorrectedMagnitude * propY)
    if (newX > 0 && velocity.x < 0 || newX < 0 && velocity.x > 0) {
      newX = 0
    }
    if (newY > 0 && velocity.y < 0 || newY < 0 && velocity.y > 0) {
      newY = 0
    }
    velocity.x = newX
    velocity.y = newY
  }
}