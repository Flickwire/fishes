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
  Energy,
  Edible
} from "../components"

export type AlgaeProps = {
  world: World
  position: Vector2
  color: Vector4
  velocity: Vector2
  drag: number
  maxAge: number,
  initialEnergy: number
}

export class Algae extends Entity {

  position: Position
  color: Color
  energy: Energy
  initialProps: {[key: string]: any}

  constructor(props: AlgaeProps) {
    super(props.world)
    this.initialProps = props
    this
      .attachComponent(new Name(this, 'Algae'))
      .attachComponent(new Energy(this, props.initialEnergy))
      .attachComponent(new Position(this, props.position))
      .attachComponent(new Color(this, props.color.x, props.color.y, props.color.z, props.color.a))
      .attachComponent(new Age(this))
      .attachComponent(new Velocity(this, props.velocity))
      .attachComponent(new Drag(this, props.drag))
      .attachComponent(new MaxAge(this, props.maxAge))
      .attachComponent(new Edible(this))

    this.color = this.getComponentOfType(Color)
    this.position = this.getComponentOfType(Position)
    this.energy = this.getComponentOfType(Energy)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const radius = this.energy.energy
    if (
      this.position.vector.x < -1 * radius ||
      this.position.vector.x > (ctx.canvas.width + radius) ||
      this.position.vector.y < -1 * radius ||
      this.position.vector.y > (ctx.canvas.height + radius)
    ) {
      return
    }
    ctx.fillStyle = this.color.toRGBA()
    ctx.beginPath()
    ctx.arc(this.position.vector.x, this.position.vector.y, radius, 0, 2 * Math.PI, false)
    ctx.fill()
  }

  static generate(world: World): Algae {
    const props = {
      position: new Vector2(
        Math.random() * world.canvas.width, 
        Math.random() * world.canvas.height
        ),
      velocity: new Vector2(
        Math.random() - 0.5, 
        Math.random() - 0.5
        ),
      drag: Math.max(0.1,Math.random()) * 10,
      world: world,
      color: new Vector4(
        Math.random() * 100, 
        (Math.random() * 100) + 150, 
        Math.random() * 150, 
        Math.max(0.3,Math.random())
        ),
      maxAge: Math.max(30,Math.floor(Math.random() * 120)),
      initialEnergy: Math.max(5,(Math.random() * 25))
    }
    return new Algae(props)
  }
}
