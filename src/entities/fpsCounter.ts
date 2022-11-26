import { Name, Position } from "../components";
import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { World } from "../engine/world";

class MeasureFPS extends Component {

  frameTimes: number[]
  fps: number

  constructor(entity: Entity) {
    super(entity)
    this.fps = 0
    this.frameTimes = []
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.frameTimes.length >= 200){
      this.frameTimes.shift()
    }
    this.frameTimes.push(time - lastTime)
    this.fps = Math.floor(1000/(this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length))
  }

  getFPS(): number {
    return this.fps
  }
}

export class FpsCounter extends Entity {
  constructor(world: World) {
    super(world)
    this
      .attachComponent(new Name(this, 'FPS Counter'))
      .attachComponent(new Position(this, 10, 30))
      .attachComponent(new MeasureFPS(this))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black'
    ctx.font = '24px sans-serif'
    const position: Position = this.getComponentOfType(Position)
    const measurement: MeasureFPS = this.getComponentOfType(MeasureFPS)
    ctx.fillText(`${measurement.getFPS()}`, position.x, position.y)
  }
}