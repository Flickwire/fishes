import { Entity } from "./entity"
import { Age } from "./thoughts/age"

export class Fish extends Entity {
  constructor() {
    super('Fish')
    this.thoughts.push(new Age())
  }
}
