import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Velocity } from "./velocity";

/**
 * Periodic impulse aligned with direction of current momentum
 */
export class MomentumAlignedImpulse extends Component {

  magnitude: number
  frequency: number
  velocity: Velocity
  lastApplied: number
  nextApply: number

  constructor(entity: Entity, magnitude = 0, frequency = 0) {
    super(entity)
    if (!entity.hasComponentOfType(Velocity)) {
      throw new Error('Please add velocity component before MomentumAlignedImpulse component');
    }
    this.magnitude = magnitude
    this.frequency = frequency * 1000
    this.lastApplied = 0
    this.nextApply = this.lastApplied + this.frequency
    this.velocity = this.entity.getComponentOfType(Velocity)
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time >= this.nextApply) {
      const velocitySum = this.velocity.x + this.velocity.y
      if (velocitySum == 0) {
        this.lastApplied = time
        this.nextApply += this.frequency
        return
      }
      console.log(`Applying impulse with magnitude ${this.magnitude} at ${time} to velocity of ${this.velocity.x}, ${this.velocity.y}`)

      const propX = this.velocity.x / velocitySum
      const propY = this.velocity.y / velocitySum
      this.velocity.x += propX * this.magnitude
      this.velocity.y += propY * this.magnitude

      this.lastApplied = time
      this.nextApply += this.frequency
    }
  }
}