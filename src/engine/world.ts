import { Entity } from "./entity";

export class World {
  entities: { [id: string]: Entity }
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
    this.entities = {}
    this.drawableEntities = []
    this.run()
  }
  
  spawnEntity = (entity: Entity): void => {
    this.entities[entity.props.id] = entity
    if (typeof entity.draw === 'function') {
      this.drawableEntities.push(entity)
    }
  }
  
  update = (): void => {
    const time = window.performance.now()
    Object.keys(this.entities).forEach(id => {
      this.entities[id].update(time, this.lastUpdate)
    });
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