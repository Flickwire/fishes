import { Name, Position } from "../components";
import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { World } from "../engine/world";

class MeasureFPS extends Component {
  frameTimes: number[];
  fps: number;

  constructor(entity: Entity) {
    super(entity);
    this.fps = 0;
    this.frameTimes = [];
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    if (this.frameTimes.length >= 200) {
      this.frameTimes.shift();
    }
    this.frameTimes.push(time - lastTime);
    this.fps = Math.floor(
      1000 /
        (this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length),
    );
  };

  getFPS(): number {
    return this.fps;
  }
}

export class FpsCounter extends Entity {
  measurement: MeasureFPS;
  position: Position;

  constructor(world: World) {
    super(world);
    this.attachComponent(new Name(this, "FPS Counter"))
      .attachComponent(new Position(this, new Vector2(10, 30)))
      .attachComponent(new MeasureFPS(this));

    this.position = this.getComponentOfType(Position);
    this.measurement = this.getComponentOfType(MeasureFPS);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.font = "24px sans-serif";
    ctx.fillText(
      `F: ${this.measurement.fps}`,
      this.position.vector.x,
      this.position.vector.y,
    );
  }
}
