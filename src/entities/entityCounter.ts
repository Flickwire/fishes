import { Name, Position } from "../components";
import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { World } from "../engine/world";

class MeasureEntities extends Component {
  entities: number;

  constructor(entity: Entity) {
    super(entity);
    this.entities = 0;
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    this.entities = Object.keys(this.entity.world.entities).length;
  };
}

export class EntityCounter extends Entity {
  measurement: MeasureEntities;
  position: Position;

  constructor(world: World) {
    super(world);
    this.attachComponent(new Name(this, "FPS Counter"))
      .attachComponent(new Position(this, new Vector2(10, 60)))
      .attachComponent(new MeasureEntities(this));
    this.measurement = this.getComponentsOfType<MeasureEntities>(MeasureEntities)[0];
    this.position = this.getComponentsOfType<Position>(Position)[0];
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.font = "24px sans-serif";
    ctx.fillText(
      `E: ${this.measurement.entities}`,
      this.position.vector.x,
      this.position.vector.y,
    );
  }
}
