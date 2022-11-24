import { Entity, Component, ComponentUpdateProps } from "../engine/entity";

export class Age extends Component {

  birthday: number
  age: number

  constructor(entity: Entity) {
    super(entity)
    entity.props.birthday = window.performance.now()
    entity.props.age = 0
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time - this.entity.props.birthday > 1000) {
      this.entity.props.age += 1
      this.entity.props.birthday = time
    }
  }
}