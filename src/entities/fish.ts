import { Entity } from "../engine/entity"
import { Vector2 } from "../engine/types/vector2"
import { Vector4 } from "../engine/types/vector4"
import { World } from "../engine/world"

import {
  Age,
  MaxAge,
  Position,
  Color,
  Velocity,
  Name,
  Drag,
  Facing,
  FacingAlignedImpulse
} from "../components"

export type FishProps = {
  world: World
  position: Vector2
  facing: Vector2
  color: Vector4
  velocity: Vector2
  drag: number
  impulseStrength: number
  impulseFrequency: number
  maxAge: number
}

export class Fish extends Entity {

  position: Position
  color: Color

  constructor(props: FishProps) {
    super(props.world)
    this
      .attachComponent(new Name(this, 'Fish'))
      .attachComponent(new Position(this, props.position.x, props.position.y))
      .attachComponent(new Facing(this, props.facing))
      .attachComponent(new Color(this, props.color.x, props.color.y, props.color.y, props.color.a))
      .attachComponent(new Age(this))
      .attachComponent(new Velocity(this, props.velocity))
      .attachComponent(new Drag(this, props.drag))
      .attachComponent(new FacingAlignedImpulse(this, props.impulseStrength, props.impulseFrequency))
      .attachComponent(new MaxAge(this, props.maxAge))

    this.color = this.getComponentOfType(Color)
    this.position = this.getComponentOfType(Position)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (
      this.position.x < -10 ||
      this.position.x > (ctx.canvas.width + 10) ||
      this.position.y < -10 ||
      this.position.y > (ctx.canvas.height + 10)
    ) {
      return
    }
    ctx.fillStyle = this.color.toRGBA()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  static generate(world: World): Fish {
    const props = {
      position: new Vector2(
        Math.random() * world.canvas.width, 
        Math.random() * world.canvas.height
        ),
      velocity: new Vector2(
        (Math.random() * 100) - 50, 
        (Math.random() * 100) - 50
        ),
      drag: Math.random() * 50,
      impulseStrength: (Math.random() * 100) - 50,
      impulseFrequency: (Math.random() * 10) + 0.1,
      world: world,
      facing: new Vector2(
        (Math.random() * 2) - 1, 
        (Math.random() * 2) - 1
        ),
      color: new Vector4(
        Math.random() * 255, 
        Math.random() * 255, 
        Math.random() * 255, 
        (Math.random() * 155) + 100
        ),
      maxAge: Math.floor(Math.random() * 100)
    }
    return new Fish(props)
  }
}
