import { World } from "./world";
import { v4 as uuidv4 } from "uuid";

export type ComponentUpdateProps = {
  time: number;
  lastTime: number;
};

export interface Component {
  update?: ({ time, lastTime }: ComponentUpdateProps) => void;
}

export abstract class Component {
  entity: Entity;
  constructor(entity: Entity) {
    this.entity = entity;
  }
}

export interface Entity {
  draw?(ctx: CanvasRenderingContext2D): void;
  reproduce?(): Entity;
}

export abstract class Entity {
  components: { [key: string]: Component };
  subscribedComponents: Component[];
  props: { [key: string]: any };
  world: World;

  constructor(world: World) {
    this.world = world;
    this.props = {};
    this.components = {};
    this.subscribedComponents = [];
    this.props.id = uuidv4();
    //console.log(`Spawned entity ${this.props.id} @ ${window.performance.now()}`)
  }

  attachComponent(component: Component): Entity {
    this.components[component.constructor.name] = component;
    if (typeof component.update === "function") {
      this.subscribedComponents.push(component);
    }
    return this;
  }

  detachComponent(component: Component): Entity {
    delete this.components[component.constructor.name];
    this.subscribedComponents.forEach((subscribedComponent, i) => {
      if (subscribedComponent.constructor.name === component.constructor.name) {
        delete this.subscribedComponents[i];
      }
    });
    return this;
  }

  getComponentOfType<T>(type: typeof Component): T | null {
    const typeName = type.name;
    if (
      typeof this.components[typeName] !== "undefined" &&
      this.components[typeName] instanceof type
    ) {
      return <T>this.components[typeName];
    }
    return null;
  }

  hasComponentOfType(type: typeof Component) {
    const typeName = type.name;
    if (
      typeof this.components[typeName] !== "undefined" &&
      this.components[typeName] instanceof type
    ) {
      return true;
    }
    return false;
  }

  update(time: number, lastTime: number): void {
    const parameters: ComponentUpdateProps = { time, lastTime };
    this.subscribedComponents.forEach((component) => {
      component.update(parameters);
    });
  }

  getProp(name: string, dfault: any = null): any {
    if (typeof this.props[name] !== "undefined") {
      return this.props[name];
    }
    return dfault;
  }
}
