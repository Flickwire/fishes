import { Entity } from "../engine/entity"
import { Age } from "../components/age"
import { Position } from "../components/position"

export class Fish extends Entity {
  constructor() {
    super('Fish')
    this.attachComponent(new Position(this))
    this.attachComponent(new Age(this))
  }
}
