import { Entity, Component, ComponentUpdateProps } from "../engine/entity";
import { Energy } from "./energy";
import { Position } from "./position";

export class Reproduces extends Component {
  threshold: number;
  energy: Energy;

  constructor(entity: Entity, threshold = 50) {
    if (typeof entity?.reproduce !== "function") {
      throw new Error(
        "Entity must be reproducable before adding Reproduces component",
      );
    }
    super(entity);
    if (!this.entity.hasComponentOfType(Energy)) {
      throw new Error(
        "Entity must have Energy component before adding Reproduces component",
      );
    }
    this.energy = this.entity.getComponentsOfType<Energy>(Energy)[0];
    this.threshold = threshold;
  }

  update = () => {
    if (this.energy.energy > this.threshold) {
      this.entity.world.spawnEntity(this.entity.reproduce());
    }
  };
}
