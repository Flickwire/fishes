import { World } from "./world";

export type ComponentProps = {
  entity: Entity,
  world: World,
  time: number,
  lastTime: number
}

export interface Component {
    update?: (
      { entity, world, time, lastTime }: ComponentProps
      ) => void
}

export class Entity {
  name: string
  components: Component[]
  props: {[key: string]: any}

  constructor(name: string) {
    this.props = {}
    this.props.name = name
    this.components = []
    console.log(`Spawned entity ${this.props.name}`)
  }

  update(world: World, time: number, lastTime: number): void {
    const parameters: ComponentProps = {entity: this, world, time, lastTime}
    this.components.forEach(component => {
      if (typeof component.update === 'function') {
        component.update(parameters)
      }
    });
  }

  getProp(name: string, dfault: any): any {
    if (typeof this.props[name] !== 'undefined') {
      return this.props[name]
    }
    return dfault
  }


}