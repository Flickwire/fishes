import { Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { Vector4 } from "../engine/types/vector4";
import { World } from "../engine/world";

import {
  Age,
  MaxAge,
  Position,
  Color,
  Velocity,
  Name,
  Drag,
  Energy,
  Edible,
  Photosynthesis,
} from "../components";

export type AlgaeProps = {
  world: World;
  position: Vector2;
  color: Vector4;
  velocity: Vector2;
  drag: number;
  maxAge: number;
  initialEnergy: number;
  photosynthesisRate: number;
};

export class Algae extends Entity {
  position: Position;
  color: Color;
  energy: Energy;
  initialProps: { [key: string]: any };

  constructor(props: AlgaeProps) {
    super(props.world);
    this.initialProps = props;
    this.attachComponent(new Name(this, "Algae"))
      .attachComponent(new Energy(this, props.initialEnergy))
      .attachComponent(new Position(this, props.position))
      .attachComponent(
        new Color(
          this,
          props.color.x,
          props.color.y,
          props.color.z,
          props.color.a,
        ),
      )
      .attachComponent(new Age(this))
      .attachComponent(new Velocity(this, props.velocity))
      .attachComponent(new Drag(this, props.drag))
      .attachComponent(new MaxAge(this, props.maxAge))
      .attachComponent(new Edible(this))
      .attachComponent(new Photosynthesis(this, props.photosynthesisRate));

    this.color = this.getComponentOfType(Color);
    this.position = this.getComponentOfType(Position);
    this.energy = this.getComponentOfType(Energy);
  }

  draw(ctx: CanvasRenderingContext2D, offset: Vector2): void {
    const radius = this.energy.energy;
    const screenSpaceX = this.position.vector.x - offset.x;
    const screenSpaceY = this.position.vector.y - offset.y;
    if (
      screenSpaceX < -1 * radius ||
      screenSpaceX > ctx.canvas.width + radius ||
      screenSpaceY < -1 * radius ||
      screenSpaceY > ctx.canvas.height + radius
    ) {
      return;
    }
    ctx.fillStyle = this.color.toRGBA();
    ctx.beginPath();
    ctx.arc(
      screenSpaceX,
      screenSpaceY,
      radius,
      0,
      2 * Math.PI,
      false,
    );
    ctx.fill();
  }

  static generate(world: World): Algae {
    const props = {
      position: new Vector2(
        Math.random() * world.width,
        Math.random() * world.height,
      ),
      velocity: new Vector2(Math.random() - 0.5, Math.random() - 0.5),
      drag: Math.max(0.1, Math.random()) * 10,
      world: world,
      color: new Vector4(
        Math.random() * 100,
        Math.random() * 100 + 150,
        Math.random() * 150,
        Math.max(0.3, Math.random()),
      ),
      maxAge: Math.max(30, Math.floor(Math.random() * 120)),
      initialEnergy: Math.max(5, Math.random() * 25),
      photosynthesisRate: Math.max(0.1, Math.random() * 2),
    };
    return new Algae(props);
  }
}
