import { Component, ComponentUpdateProps, Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2";
import { Edible } from "./edible";
import { Energy } from "./energy";
import { Facing } from "./facing";
import { Position } from "./position";
import { Velocity } from "./velocity";

/**
 * Will turn to face nearest source of food (Entity with Edible component)
 */
export class SeeksFood extends Component {

  frequency: number
  position: Position
  facing: Facing
  lastApplied: number
  nextApply: number
  consumesEnergy: boolean
  energy: Energy

  constructor(entity: Entity, frequency = 0) {
    super(entity)
    if (!entity.hasComponentOfType(Position)) {
      throw new Error('Please add Position component before SeeksFood component');
    }
    if (!entity.hasComponentOfType(Facing)) {
      throw new Error('Please add Facing component before SeeksFood component');
    }
    this.consumesEnergy = true
    if (!entity.hasComponentOfType(Energy)) {
      this.consumesEnergy = false
    } else {
      this.energy = this.entity.getComponentOfType(Energy)
    }
    this.frequency = frequency * 1000
    this.lastApplied = window.performance.now()
    this.nextApply = this.lastApplied + this.frequency
    this.position = this.entity.getComponentOfType(Position)
    this.facing = this.entity.getComponentOfType(Facing)
  }

  findNearestEdibleEntity(): Vector2 | null {
    const allEntities = this.entity.world.entities
    var closestEntityVector: Vector2 = null
    var closestDistance = Infinity
    Object.keys(allEntities).forEach(id => {
      const entity = allEntities[id]
      if (entity.hasComponentOfType(Edible) && entity.hasComponentOfType(Position)) {
        const pointing = this.position.vector.vectorTo(entity.getComponentOfType<Position>(Position).vector)
        const magnitude = pointing.magnitude()
        if (magnitude < closestDistance) {
          closestDistance = magnitude
          closestEntityVector = pointing
        }
      }
    });
    return closestEntityVector
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time >= this.nextApply) {
      const newTarget = this.findNearestEdibleEntity()

      if (newTarget !== null) {
        this.facing.vector = newTarget

        if (this.consumesEnergy) {
          this.energy.energy -= 0.01
        }
      }

      this.lastApplied = time
      this.nextApply += this.frequency
    }
  }
}