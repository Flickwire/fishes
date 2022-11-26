import { Entity } from "../engine/entity"
import { Age } from "../components/age"
import { Position } from "../components/position"
import { Color } from "../components/color"
import { Velocity } from "../components/velocity"
import { Vector2 } from "../engine/types/vector2"
import { Name } from "../components/name"

export class Fish extends Entity {
  constructor() {
    super('Fish')
    this
      .attachComponent(new Name(this, 'Fish'))
      .attachComponent(new Position(this, 50, 50))
      .attachComponent(new Color(this, 240, 100, 50, 255))
      .attachComponent(new Age(this))
      .attachComponent(new Velocity(this, new Vector2(1, 3)))
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const color = this.props.color
    const colStr = `rgba(${color.x}, ${color.y}, ${color.z}, ${color.a})`
    ctx.fillStyle = colStr
    ctx.beginPath()
    ctx.arc(this.props.position.x, this.props.position.y, 10, 0, 2 * Math.PI, false)
    ctx.fill()
  }
}
