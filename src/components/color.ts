import { Entity, Component } from "../engine/entity";
import { Vector4 } from "../engine/types/vector4";

export class Color extends Component {
  constructor(entity: Entity, r = 0, g = 0, b = 0, a = 0) {
    super(entity)
    entity.props.color = new Vector4(r, g, b, a)
  }
}