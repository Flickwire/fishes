import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { Vector2 } from "../engine/types/vector2";
import { Age } from "./age";
import { Position } from "./position";

export class MaxAge extends Component {
  age: Age;
  maxAge: number;

  constructor(entity: Entity, maxAge: number) {
    super(entity);
    if (!entity.hasComponentOfType(Age)) {
      throw new Error("Please add Age component before MaxAge component");
    }

    this.age = entity.getComponentOfType(Age);
    this.maxAge = maxAge;
  }

  update = (): void => {
    if (this.age.age >= this.maxAge) {
      this.entity.world.deleteEntity(this.entity);
    }
  };
}
