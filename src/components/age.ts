import { Entity, Component, ComponentProps } from "../engine/entity";

export class Age implements Component {

  birthday: number
  age: number

  constructor(entity: Entity) {
    entity.props.birthday = window.performance.now()
    entity.props.age = 0
  }

  update({ time, entity, lastTime }: ComponentProps): void {
    if (time - entity.props.birthday > 1000) {
      entity.props.age += 1
      entity.props.birthday = time
      console.log(`${entity.getProp('name', 'Unknown Entity')} is ${entity.props.age} seconds old`)
      console.log(`${1000 / (time - lastTime)} fps`)
    }
  }
}