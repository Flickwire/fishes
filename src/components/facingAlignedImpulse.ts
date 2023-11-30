import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Energy } from "./energy";
import { Facing } from "./facing";
import { Velocity } from "./velocity";

/**
 * Periodic impulse aligned with direction of current facing
 */
export class FacingAlignedImpulse extends Component {
  magnitude: number;
  frequency: number;
  velocity: Velocity;
  facing: Facing;
  lastApplied: number;
  nextApply: number;
  consumesEnergy: boolean;
  energy: Energy;

  constructor(entity: Entity, magnitude = 0, frequency = 0) {
    super(entity);
    if (!entity.hasComponentOfType(Velocity)) {
      throw new Error(
        "Please add velocity component before FacingAlignedImpulse component",
      );
    }
    if (!entity.hasComponentOfType(Facing)) {
      throw new Error(
        "Please add Facing component before FacingAlignedImpulse component",
      );
    }
    this.consumesEnergy = true;
    if (!entity.hasComponentOfType(Energy)) {
      this.consumesEnergy = false;
    } else {
      this.energy = this.entity.getComponentOfType(Energy);
    }
    this.magnitude = magnitude;
    this.frequency = frequency * 1000;
    this.lastApplied = window.performance.now();
    this.nextApply = this.lastApplied + this.frequency;
    this.velocity = this.entity.getComponentOfType(Velocity);
    this.facing = this.entity.getComponentOfType(Facing);
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time >= this.nextApply) {
      if (this.facing.vector.x === 0 && this.facing.vector.y === 0) {
        throw new Error("Facing vector should never be (0,0)");
      }

      const normal = this.facing.vector.normalise();
      this.velocity.vector.x += normal.x * this.magnitude;
      this.velocity.vector.y += normal.y * this.magnitude;

      if (this.consumesEnergy) {
        this.energy.energy -= this.magnitude / 10;
      }

      this.lastApplied = time;
      this.nextApply += this.frequency;
    }
  };
}
