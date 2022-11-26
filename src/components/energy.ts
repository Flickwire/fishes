import { Component, Entity } from "../engine/entity"

export class Energy extends Component {

  energy: number

  constructor(entity: Entity, initial = 0) {
    super(entity)
    this.energy = initial
  }

  update = (): void => {
    if (this.energy == 0) {
      this.entity.world.deleteEntity(this.entity)
    }
  }
}