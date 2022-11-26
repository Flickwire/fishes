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
  FacingAlignedImpulse,
  Energy
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
  maxAge: number,
  initialEnergy: number
}

export class Fish extends Entity {

  position: Position
  color: Color

  constructor(props: FishProps) {
    super(props.world)
    this
      .attachComponent(new Name(this, 'Fish'))
      .attachComponent(new Energy(this, props.initialEnergy))
      .attachComponent(new Position(this, props.position.x, props.position.y))
      .attachComponent(new Facing(this, props.facing))
      .attachComponent(new Color(this, props.color.x, props.color.y, props.color.z, props.color.a))
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
        Math.random() - 0.5, 
        Math.random() - 0.5
        ),
      drag: Math.random() * 50,
      impulseStrength: (Math.max(Math.random(), 0.5) * 100) - 50,
      impulseFrequency: Math.max((Math.random() * 5), 0.1),
      world: world,
      facing: new Vector2(
        (Math.random() * 2) - 1, 
        (Math.random() * 2) - 1
        ),
      color: new Vector4(
        (Math.random() * 40) + 200, 
        (Math.random() * 150) + 55, 
        Math.random() * 100, 
        Math.max(0.5,Math.random())
        ),
      maxAge: Math.floor(Math.max(0.02,Math.random()) * 60),
      initialEnergy: Math.max(0.1,(Math.random() * 100))
    }
    return new Fish(props)
  }
}
