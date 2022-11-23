import { Entity } from "./engine/entity"
import { Age } from "./components/age"

export class Fish extends Entity {
  constructor() {
    super('Fish')
    this.components.push(new Age(this))
  }
}
