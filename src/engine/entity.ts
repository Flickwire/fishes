import { World } from "./world";

export type ComponentUpdateProps = {
  time: number,
  lastTime: number
}

export interface Component {
    update?: (
      { time, lastTime }: ComponentUpdateProps
      ) => void
}

export abstract class Component {
  entity: Entity
  constructor(entity: Entity){
    this.entity = entity
  }
}

export interface Entity {
  draw?(ctx: CanvasRenderingContext2D): void
}

export abstract class Entity {
  name: string
  components: {[key: string]: Component}
  subscribedComponents: Component[]
  props: {[key: string]: any}

  constructor(name: string) {
    this.props = {}
    this.props.name = name
    this.components = {}
    this.subscribedComponents = []
    console.log(`Spawned entity ${this.props.name}`)
  }

  attachComponent(component: Component): Entity {
    this.components[component.constructor.name] = component
    if (typeof component.update === 'function') {
      this.subscribedComponents.push(component)
    }
    return this
  }

  getComponentOfType(type: typeof Component){
    const typeName = type.name
    if (typeof this.components[typeName] !== 'undefined' && this.components[typeName] instanceof type) {
      return this.components[typeName]
    }
    return null
  }

  hasComponentOfType(type: typeof Component){
    const typeName = type.name
    if (typeof this.components[typeName] !== 'undefined' && this.components[typeName] instanceof type) {
      return true
    }
    return false
  }

  update(world: World, time: number, lastTime: number): void {
    const parameters: ComponentUpdateProps = {time, lastTime}
    this.subscribedComponents.forEach(component => {
      component.update(parameters)
    });
  }

  getProp(name: string, dfault: any = null): any {
    if (typeof this.props[name] !== 'undefined') {
      return this.props[name]
    }
    return dfault
  }


}