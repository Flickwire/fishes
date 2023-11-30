import { Entity, Component } from "../engine/entity";
import { Vector4 } from "../engine/types/vector4";

export class Color extends Component {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(entity: Entity, r = 0, g = 0, b = 0, a = 0) {
    super(entity);

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  toRGBA(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
