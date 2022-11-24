import { Position } from "../components/position";
import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";

class MeasureFPS extends Component {

  frameTimes: number[]

  constructor(entity: Entity) {
    super(entity)
    entity.props.fps = 0
    this.frameTimes = []
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.frameTimes.length >= 400){
      this.frameTimes.shift()
    }
    this.frameTimes.push(time - lastTime)
    this.entity.props.fps = Math.floor(1000/this.frameTimes.reduce((p, c, i) => p+(c-p)/(i+1)))
  }
}

export class FpsCounter extends Entity {
  constructor() {
    super('FPSCounter')
    this.attachComponent(new Position(this, 10, 30))
      .attachComponent(new MeasureFPS(this))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black'
    ctx.font = '24px sans-serif'
    const position: Vector2 = this.props.position
    ctx.fillText(`${Math.floor(this.getProp('fps', 0))}`, position.x, position.y)
  }
}