import { Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { Vector4 } from "../engine/types/vector4";
import { World } from "../engine/world";

import {
  Age,
  Position,
  Color,
  Velocity,
  Name,
  Drag,
  Facing,
  FacingAlignedImpulse,
  Energy,
  SeeksFood,
  Edible,
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
  edible: boolean;
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
      .attachComponent(
        new Position(this, new Vector2(props.position.x, props.position.y)),
      )
      .attachComponent(
        new Facing(this, new Vector2(props.facing.x, props.facing.y)),
      )
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
      .attachComponent(
        new Velocity(this, new Vector2(props.velocity.x, props.velocity.y)),
      )
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

    if (props.edible) {
      this.attachComponent(new Edible(this));
    }

    this.color = this.getComponentsOfType<Color>(Color)[0];
    this.position = this.getComponentsOfType<Position>(Position)[0];
    this.facing = this.getComponentsOfType<Facing>(Facing)[0];
    this.energy = this.getComponentsOfType<Energy>(Energy)[0];
  }

  draw(ctx: CanvasRenderingContext2D, offset: Vector2): void {
    const screenSpaceX = this.position.vector.x - offset.x;
    const screenSpaceY = this.position.vector.y - offset.y;
    if (
      screenSpaceX < -10 ||
      screenSpaceX > ctx.canvas.width + 10 ||
      screenSpaceY < -10 ||
      screenSpaceY > ctx.canvas.height + 10
    ) {
      return;
    }
    this.color.a = Math.min(this.energy.energy, 50) / 50;
    const facingNormal = this.facing.vector.normalise();
    const eyesPos = new Vector2(
      screenSpaceX + 9 * facingNormal.x,
      screenSpaceY + 9 * facingNormal.y,
    );
    ctx.fillStyle = this.color.toRGBA();
    ctx.beginPath();
    ctx.arc(
      screenSpaceX,
      screenSpaceY,
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
    newProps.position.x =
      this.position.vector.x + Math.floor((Math.random() - 0.5) * 100);
    newProps.position.y =
      this.position.vector.y + Math.floor((Math.random() - 0.5) * 100);
    newProps.initialEnergy = this.energy.energy / 2;
    newProps.velocity.x = 0;
    newProps.velocity.y = 0;
    this.energy.energy /= 2;
    return new Fish(newProps);
  }

  static generate(world: World): Fish {
    const props = {
      position: new Vector2(
        Math.random() * world.width,
        Math.random() * world.height,
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
      edible: Math.random() < 0.5,
    };
    return new Fish(props);
  }
}
