import { Entity } from "./entity";

export class World {
  entities: Entity[]
  drawableEntities: Entity[]
  lastUpdate: number
  canvas: HTMLCanvasElement
  renderContext: CanvasRenderingContext2D

  constructor () {
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'pond'
    this.renderContext = this.canvas.getContext('2d')
    document.body.append(this.canvas)
    console.log("world exists")
    this.lastUpdate = window.performance.now()
    this.entities = []
    this.drawableEntities = []
    this.run()
  }
  
  spawnEntity = (entity: Entity): void => {
    this.entities.push(entity)
    if (typeof entity.draw === 'function') {
      this.drawableEntities.push(entity)
    }
  }
  
  update = (): void => {
    const time = window.performance.now()
    this.entities.map((entity) => {
      entity.update(this, time, this.lastUpdate)
    })
    this.lastUpdate = time
    this.draw()
    setTimeout(this.update, 0)
  }

  draw = (): void => {
    if (this.canvas.width != window.visualViewport.width) {
      this.canvas.width = window.visualViewport.width
    }
    if (this.canvas.height != window.visualViewport.height) {
      this.canvas.height = window.visualViewport.height
    }
    this.renderContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawableEntities.map((entity) => {
      entity.draw(this.renderContext)
    })
  }

  run = (): void => {
    setTimeout(this.update, 0)
  }
}