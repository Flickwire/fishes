import { Position } from "../components/position";
import { Component, ComponentProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";

class MeasureFPS implements Component {

  birthday: number
  age: number

  constructor(entity: Entity) {
    entity.props.fps = 0
    entity.props.fpsLastUpdate = 0
  }

  update({ time, entity, lastTime }: ComponentProps): void {
    if (time - entity.props.fpsLastUpdate > 100) {
      entity.props.fps = 1000 / (time - lastTime)
      entity.props.fpsLastUpdate = time
    }
  }
}

export class FpsCounter extends Entity {
  constructor() {
    super('FPSCounter')
    this.attachComponent(new Position(this, 10, 30))
    this.attachComponent(new MeasureFPS(this))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black'
    ctx.font = '24px sans-serif'
    const position: Vector2 = this.props.position
    ctx.fillText(`${Math.floor(this.getProp('fps', 0))}`, position.x, position.y)
  }
}