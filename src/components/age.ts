import { Entity, Component, ComponentUpdateProps } from "../engine/entity";

export class Age extends Component {

  birthday: number
  age: number

  constructor(entity: Entity) {
    super(entity)
    this.birthday = window.performance.now()
    this.age = 0
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time - this.birthday > 1000) {
      this.age += 1
      this.birthday = time
    }
  }
}