import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { Edible } from "./edible";
import { Energy } from "./energy";
import { Facing } from "./facing";
import { Hunting } from "./hunting";
import { Position } from "./position";

/**
 * Will turn to face nearest source of food (Entity with Edible component)
 */
export class SeeksFood extends Component {
  frequency: number;
  position: Position;
  facing: Facing;
  lastApplied: number;
  nextApply: number;
  consumesEnergy: boolean;
  energy: Energy;

  constructor(entity: Entity, frequency = 0) {
    super(entity);
    if (!entity.hasComponentOfType(Position)) {
      throw new Error(
        "Please add Position component before SeeksFood component",
      );
    }
    if (!entity.hasComponentOfType(Facing)) {
      throw new Error("Please add Facing component before SeeksFood component");
    }
    this.consumesEnergy = true;
    if (!entity.hasComponentOfType(Energy)) {
      this.consumesEnergy = false;
    } else {
      this.energy = this.entity.getComponentOfType(Energy);
    }
    this.frequency = frequency * 1000;
    this.lastApplied = window.performance.now();
    this.nextApply = this.lastApplied + this.frequency;
    this.position = this.entity.getComponentOfType(Position);
    this.facing = this.entity.getComponentOfType(Facing);
  }

  findNearestEdibleEntity(): {
    vector: Vector2;
    distance: number;
    entity: Entity;
  } | null {
    const allEntities = this.entity.world.entities;
    var closestEntityVector: Vector2 = null;
    var closestDistance = Infinity;
    var closestEntity: Entity = null;
    Object.keys(allEntities).forEach((id) => {
      const entity = allEntities[id];
      if (
        entity.hasComponentOfType(Edible) &&
        entity.hasComponentOfType(Position) &&
        entity.props.id !== this.entity.props.id
      ) {
        const pointing = this.position.vector.vectorTo(
          entity.getComponentOfType<Position>(Position).vector,
        );
        const magnitude = pointing.magnitude();
        if (magnitude < closestDistance) {
          closestDistance = magnitude;
          closestEntityVector = pointing;
          closestEntity = entity;
        }
      }
    });
    if (closestDistance === Infinity) {
      return null;
    }
    return {
      vector: closestEntityVector,
      distance: closestDistance,
      entity: closestEntity,
    };
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time >= this.nextApply) {
      this.lastApplied = time;
      this.nextApply += this.frequency;
      if (this.entity.hasComponentOfType(Hunting)) {
        return;
      }
      const newTarget = this.findNearestEdibleEntity();
      if (newTarget !== null) {
        this.entity.attachComponent(new Hunting(this.entity, newTarget.entity));
      }
    }
  };
}
