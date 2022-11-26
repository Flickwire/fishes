import { Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { World } from "../engine/world"

import {
  Age,
  Position,
  Color,
  Velocity,
  Name,
  Drag,
  Facing,
  FacingAlignedImpulse
} from "../components"

export class Fish extends Entity {
  constructor(world: World) {
    super(world)
    this
      .attachComponent(new Name(this, 'Fish'))
      .attachComponent(new Position(this, 400, 400))
      .attachComponent(new Facing(this, new Vector2(4,1)))
      .attachComponent(new Color(this, 240, 100, 50, 255))
      .attachComponent(new Age(this))
      .attachComponent(new Velocity(this, new Vector2(-100, 60)))
      .attachComponent(new Drag(this, 35))
      .attachComponent(new FacingAlignedImpulse(this, (35 * 1.5), 1.5))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const color: Color = this.getComponentOfType(Color)
    const position: Position = this.getComponentOfType(Position)
    ctx.fillStyle = color.toRGBA()
    ctx.beginPath()
    ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI, false)
    ctx.fill()
  }
}
