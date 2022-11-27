import { Entity, Component, ComponentUpdateProps } from "../engine/entity";
import { Energy } from "./energy";

export class Photosynthesis extends Component {

  rate: number
  energy: Energy

  constructor(entity: Entity, rate: number) {
    super(entity)
    this.rate = rate
    if (!this.entity.hasComponentOfType(Energy)) {
      throw new Error('Please add Energy component before Photosynthesis component');
    }
    this.energy = this.entity.getComponentOfType(Energy)
  }

  update = ({ time, lastTime }: ComponentUpdateProps): void => {
    const tMod = (time - lastTime) / 1000
    this.energy.energy += tMod * this.rate
  }
}