import { Entity, Thought } from "../entity";

export class Age implements Thought {

  birthday: number
  age: number

  constructor() {
    this.birthday = window.performance.now()
    this.age = 0
  }

  think(entity: Entity): void {
    const time = window.performance.now()
    if (time - this.birthday > 1000) {
      this.age += 1
      this.birthday = time
      console.log(`${entity.name} is ${this.age} seconds old`)
    }
  }
}