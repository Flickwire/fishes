import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Velocity } from "./velocity";

/**
 * Periodic impulse aligned with direction of current momentum
 */
export class MomentumAlignedImpulse extends Component {
  magnitude: number;
  frequency: number;
  velocity: Velocity;
  lastApplied: number;
  nextApply: number;

  constructor(entity: Entity, magnitude = 0, frequency = 0) {
    super(entity);
    if (!entity.hasComponentOfType(Velocity)) {
      throw new Error(
        "Please add velocity component before MomentumAlignedImpulse component",
      );
    }
    this.magnitude = magnitude;
    this.frequency = frequency * 1000;
    this.lastApplied = 0;
    this.nextApply = this.lastApplied + this.frequency;
    this.velocity = this.entity.getComponentsOfType<Velocity>(Velocity)[0];
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time >= this.nextApply) {
      if (this.velocity.vector.x === 0 && this.velocity.vector.y === 0) {
        this.lastApplied = time;
        this.nextApply += this.frequency;
        return;
      }

      const normal = this.velocity.vector.normalise();
      this.velocity.vector.x += normal.x * this.magnitude;
      this.velocity.vector.y += normal.y * this.magnitude;

      this.lastApplied = time;
      this.nextApply += this.frequency;
    }
  };
}
