import { Entity, Component } from "../engine/entity"

export class Position extends Component {

  x: number
  y: number

  constructor(entity: Entity, x = 0, y = 0) {
    super(entity)
    this.x = x
    this.y = y
  }
}