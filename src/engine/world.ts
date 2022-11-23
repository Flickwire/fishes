import { Entity } from "./entity";

export class World {
  entities: Entity[]
  lastUpdate: number

  constructor () {
    console.log("world exists")
    this.lastUpdate = window.performance.now()
    this.entities = []
    this.run()
  }
  
  spawnEntity = (entity: Entity): void => {
    this.entities.push(entity)
  }
  
  update = (): void => {
    const time = window.performance.now()
    this.entities.map((entity) => {
      entity.update(this, time, this.lastUpdate)
    })
    console.log(`update at ${time}`)
    this.lastUpdate = time
  }

  run = (): void => {
    for (;;) {
      setTimeout(this.update, 10)
    }
  }
}