import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Velocity } from "./velocity";

export class Drag extends Component {
  dragFactor: number;
  velocity: Velocity;

  constructor(entity: Entity, dragFactor = 1) {
    super(entity);
    if (!entity.hasComponentOfType(Velocity)) {
      throw new Error("Please add velocity component before drag component");
    }
    this.dragFactor = dragFactor;
    this.velocity = this.entity.getComponentOfType(Velocity);
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.velocity.vector.x === 0 && this.velocity.vector.y === 0) {
      return;
    }
    const dT = time - lastTime;
    const mod = dT / 100;
    //Target for velocity in 1 second: 1/dragFactor * current velocity
    const targetVelX = this.velocity.vector.x / this.dragFactor;
    const targetVelY = this.velocity.vector.y / this.dragFactor;
    const diffX = targetVelX - this.velocity.vector.x;
    const diffY = targetVelY - this.velocity.vector.y;
    const newX = this.velocity.vector.x + diffX * mod;
    const newY = this.velocity.vector.y + diffY * mod;
    this.velocity.vector.x = newX;
    this.velocity.vector.y = newY;
  };
}
