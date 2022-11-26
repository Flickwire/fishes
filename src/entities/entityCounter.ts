import { Name, Position } from "../components";
import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { World } from "../engine/world";

class MeasureEntities extends Component {

  entities: number

  constructor(entity: Entity) {
    super(entity)
    this.entities = 0
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    this.entities = Object.keys(this.entity.world.entities).length
  }
}

export class EntityCounter extends Entity {

  measurement: MeasureEntities
  position: Position

  constructor(world: World) {
    super(world)
    this
      .attachComponent(new Name(this, 'FPS Counter'))
      .attachComponent(new Position(this, 10, 60))
      .attachComponent(new MeasureEntities(this))
    this.measurement = this.getComponentOfType(MeasureEntities)
    this.position = this.getComponentOfType(Position)
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'black'
    ctx.font = '24px sans-serif'
    ctx.fillText(`E: ${this.measurement.entities}`, this.position.x, this.position.y)
  }
}