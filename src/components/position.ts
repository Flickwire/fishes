import { Entity, Component } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";

export class Position implements Component {
  constructor(entity: Entity, x: number = 0, y: number = 0) {
    entity.props.position = new Vector2(x, y)
  }
}