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

export interface Entity {
  draw?(ctx: CanvasRenderingContext2D): void
}

export abstract class Entity {
  name: string
  components: Component[]
  subscribedComponents: Component[]
  props: {[key: string]: any}

  constructor(name: string) {
    this.props = {}
    this.props.name = name
    this.components = []
    this.subscribedComponents = []
    console.log(`Spawned entity ${this.props.name}`)
  }

  attachComponent(component: Component): void {
    this.components.push(component)
    if (typeof component.update === 'function') {
      this.subscribedComponents.push(component)
    }
  }

  update(world: World, time: number, lastTime: number): void {
    const parameters: ComponentProps = {entity: this, world, time, lastTime}
    this.subscribedComponents.forEach(component => {
      component.update(parameters)
    });
  }

  getProp(name: string, dfault: any): any {
    if (typeof this.props[name] !== 'undefined') {
      return this.props[name]
    }
    return dfault
  }


}