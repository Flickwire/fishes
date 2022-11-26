import { Entity } from "../engine/entity"
import { Age } from "../components/age"
import { Position } from "../components/position"
import { Color } from "../components/color"
import { Velocity } from "../components/velocity"
import { Vector2 } from "../engine/types/vector2"
import { Name } from "../components/name"
import { Drag } from "../components/drag"
import { World } from "../engine/world"

export class Fish extends Entity {
  constructor(world: World) {
    super(world)
    this
      .attachComponent(new Name(this, 'Fish'))
      .attachComponent(new Position(this, 50, 50))
      .attachComponent(new Color(this, 240, 100, 50, 255))
      .attachComponent(new Age(this))
      .attachComponent(new Velocity(this, new Vector2(10, 30)))
      .attachComponent(new Drag(this, 5))
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
