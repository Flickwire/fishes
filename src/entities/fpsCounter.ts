import { Name } from "../components/name";
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
    if (this.frameTimes.length >= 200){
      this.frameTimes.shift()
    }
    this.frameTimes.push(time - lastTime)
    this.entity.props.fps = Math.floor(1000/(this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length))
  }
}

export class FpsCounter extends Entity {
  constructor() {
    super()
    this
      .attachComponent(new Name(this, 'FPS Counter'))
      .attachComponent(new Position(this, 10, 30))
      .attachComponent(new MeasureFPS(this))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black'
    ctx.font = '24px sans-serif'
    const position: Vector2 = this.props.position
    ctx.fillText(`${Math.floor(this.getProp('fps', 0))}`, position.x, position.y)
  }
}