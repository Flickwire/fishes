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
  Facing,
  FacingAlignedImpulse,
  Energy,
  SeeksFood,
} from "../components";
import { Reproduces } from "../components/reproduces";

export type FishProps = {
  world: World;
  position: Vector2;
  facing: Vector2;
  color: Vector4;
  velocity: Vector2;
  drag: number;
  impulseStrength: number;
  impulseFrequency: number;
  seekFrequency: number;
  initialEnergy: number;
  reproductionThreshold: number;
};

export class Fish extends Entity {
  position: Position;
  color: Color;
  facing: Facing;
  energy: Energy;
  initialProps: FishProps;

  constructor(props: FishProps) {
    super(props.world);
    this.initialProps = props;
    this.attachComponent(new Name(this, "Fish"))
      .attachComponent(new Energy(this, props.initialEnergy))
      .attachComponent(new Position(this, new Vector2(props.position.x, props.position.y)))
      .attachComponent(new Facing(this, new Vector2(props.facing.x, props.facing.y)))
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
      .attachComponent(new Velocity(this, new Vector2(props.velocity.x, props.velocity.y)))
      .attachComponent(new Drag(this, props.drag))
      .attachComponent(
        new FacingAlignedImpulse(
          this,
          props.impulseStrength,
          props.impulseFrequency,
        ),
      )
      .attachComponent(new SeeksFood(this, props.seekFrequency))
      .attachComponent(new Reproduces(this, props.reproductionThreshold));

    this.color = this.getComponentOfType(Color);
    this.position = this.getComponentOfType(Position);
    this.facing = this.getComponentOfType(Facing);
    this.energy = this.getComponentOfType(Energy);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (
      this.position.vector.x < -10 ||
      this.position.vector.x > ctx.canvas.width + 10 ||
      this.position.vector.y < -10 ||
      this.position.vector.y > ctx.canvas.height + 10
    ) {
      return;
    }
    this.color.a = Math.min(this.energy.energy, 50) / 50;
    const facingNormal = this.facing.vector.normalise();
    const eyesPos = new Vector2(
      this.position.vector.x + 9 * facingNormal.x,
      this.position.vector.y + 9 * facingNormal.y,
    );
    ctx.fillStyle = this.color.toRGBA();
    ctx.beginPath();
    ctx.arc(
      this.position.vector.x,
      this.position.vector.y,
      15,
      0,
      2 * Math.PI,
      false,
    );
    ctx.fill();
    ctx.fillStyle = `rgba(0,0,0,${this.color.a})`;
    ctx.beginPath();
    ctx.arc(eyesPos.x, eyesPos.y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
  }

  reproduce(): Fish {
    const newProps: FishProps = { ...this.initialProps };
    newProps.position.x = this.position.vector.x + Math.floor((Math.random() - 0.5) * 100);
    newProps.position.y = this.position.vector.y + Math.floor((Math.random() - 0.5) * 100);
    newProps.initialEnergy = this.energy.energy / 2;
    newProps.velocity.x = 0;
    newProps.velocity.y = 0;
    this.energy.energy /= 2;
    console.log('reproduced', newProps);
    return new Fish(newProps);
  }

  static generate(world: World): Fish {
    const props = {
      position: new Vector2(
        Math.random() * world.canvas.width,
        Math.random() * world.canvas.height,
      ),
      velocity: new Vector2(Math.random() - 0.5, Math.random() - 0.5),
      drag: 1.05,
      impulseStrength: Math.max(Math.random(), 0.2) * 40,
      impulseFrequency: Math.max(Math.random(), 0.01) * 2.5,
      seekFrequency: Math.max(Math.random() * 0.2, 0.05),
      world: world,
      facing: new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1),
      color: new Vector4(
        Math.random() * 40 + 200,
        Math.random() * 150 + 55,
        Math.random() * 100,
        Math.max(0.5, Math.random()),
      ),
      initialEnergy: Math.max(50, Math.random() * 200),
      reproductionThreshold: Math.max(30, Math.random() * 400),
    };
    return new Fish(props);
  }
}
