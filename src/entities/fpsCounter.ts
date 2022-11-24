import { Component, ComponentProps, Entity } from "../engine/entity";
import { World } from "../engine/world";

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
    this.attachComponent(new MeasureFPS(this))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = 'red'
    ctx.font = '24px sans-serif'
    ctx.strokeText(`${Math.floor(this.getProp('fps', 0))}`, this.getProp('positionX', 10) as number, this.getProp('positionY',30) as number)
  }
}