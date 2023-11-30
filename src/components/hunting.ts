import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { Edible } from "./edible";
import { Energy } from "./energy";
import { Facing } from "./facing";
import { Position } from "./position";

/**
 * Actively hunting a source of food
 */
export class Hunting extends Component {
  position: Position;
  facing: Facing;
  energy: Energy;
  target: Entity;
  targetEnergy: Energy;
  targetPosition: Position;

  constructor(entity: Entity, target: Entity = null) {
    super(entity);
    if (!entity.hasComponentOfType(Position)) {
      throw new Error("Please add Position component before Hunting component");
    }
    if (!entity.hasComponentOfType(Facing)) {
      throw new Error("Please add Facing component before Hunting component");
    }
    if (!entity.hasComponentOfType(Energy)) {
      throw new Error("Please add Energy component before Hunting component");
    }
    if (!(target instanceof Entity)) {
      throw new Error("Target must be an entity");
    }
    if (!target.hasComponentOfType(Energy)) {
      throw new Error("Cannot hunt entity which has no Energy");
    }
    if (!target.hasComponentOfType(Position)) {
      throw new Error("Cannot hunt entity which has no Position");
    }
    this.energy = this.entity.getComponentOfType(Energy);
    this.position = this.entity.getComponentOfType(Position);
    this.facing = this.entity.getComponentOfType(Facing);
    this.target = target;
    this.targetEnergy = this.target.getComponentOfType(Energy);
    this.targetPosition = this.target.getComponentOfType(Position);
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.targetEnergy.energy <= 0) {
      this.entity.detachComponent(this);
    }

    const vectorToTarget = this.position.vector.vectorTo(
      this.targetPosition.vector,
    );
    const turnModifier = 2000 / (time - lastTime);

    const newFacing = new Vector2(
      this.facing.vector.x * turnModifier + vectorToTarget.x,
      this.facing.vector.y * turnModifier + vectorToTarget.y,
    ).normalise();
    this.facing.vector = newFacing;

    //If new target is close enough, eat it
    if (vectorToTarget.magnitude() <= 15) {
      this.energy.energy += this.targetEnergy.energy;
      this.targetEnergy.energy = 0;
      this.entity.detachComponent(this);
    }
  };
}
