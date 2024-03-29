import { Vector2 } from "./types/vector2";
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
  id: string;
  entity: Entity;
  constructor(entity: Entity) {
    this.id = uuidv4();
    this.entity = entity;
  }
}

export interface Entity {
  draw?(ctx: CanvasRenderingContext2D, offset: Vector2): void;
  reproduce?(): Entity;
}

export abstract class Entity {
  components: { [key: string]: Component };
  subscribedComponents: { [key: string]: Component };
  props: { [key: string]: any };
  world: World;

  constructor(world: World) {
    this.world = world;
    this.props = {};
    this.components = {};
    this.subscribedComponents = {};
    this.props.id = uuidv4();
  }

  attachComponent(component: Component): Entity {
    this.components[component.id] = component;
    if (typeof component.update === "function") {
      this.subscribedComponents[component.id] = component;
    }
    return this;
  }

  detachComponent(component: Component): Entity {
    delete this.components[component.id];
    delete this.subscribedComponents[component.id];
    return this;
  }

  getComponentsOfType<T extends Component>(type: typeof Component): T[] | null {
    const typeName = type.name;
    const results = [];
    for (const componentId in this.components) {
      if (this.components[componentId].constructor.name === typeName) {
        results.push(this.components[componentId]);
      }
    }
    if (
      results.length > 0
    ) {
      return <T[]>results;
    }
    return null;
  }

  hasComponentOfType(type: typeof Component) {
    const components = this.getComponentsOfType<Component>(type);
    return Array.isArray(components);
  }

  update(time: number, lastTime: number): void {
    const parameters: ComponentUpdateProps = { time, lastTime };
    for (const componentId in this.subscribedComponents) {
      this.components[componentId].update(parameters);
    };
  }

  getProp(name: string, dfault: any = null): any {
    if (typeof this.props[name] !== "undefined") {
      return this.props[name];
    }
    return dfault;
  }
}
