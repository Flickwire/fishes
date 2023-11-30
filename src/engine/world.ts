import { Entity } from "./entity";

export class World {
  entities: { [id: string]: Entity };
  drawableEntities: { [id: string]: Entity };
  lastUpdate: number;
  canvas: HTMLCanvasElement;
  renderContext: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.renderContext = this.canvas.getContext("2d");
    document.body.append(this.canvas);
    console.log("world exists");
    this.lastUpdate = window.performance.now();
    this.entities = {};
    this.drawableEntities = {};
    this.run();
  }

  spawnEntity = (entity: Entity): void => {
    this.entities[entity.props.id] = entity;
    if (typeof entity.draw === "function") {
      this.drawableEntities[entity.props.id] = entity;
    }
  };

  deleteEntity = (entity: Entity): void => {
    if (typeof (<any>entity)?.cleanup === "function") {
      (<any>entity)?.cleanup();
    }
    if (typeof this.entities[entity.props.id] !== "undefined") {
      delete this.entities[entity.props.id];
    }
    if (typeof this.drawableEntities[entity.props.id] !== "undefined") {
      delete this.drawableEntities[entity.props.id];
    }
  };

  update = (): void => {
    const time = window.performance.now();
    Object.keys(this.entities).forEach((id) => {
      this.entities[id].update(time, this.lastUpdate);
    });
    this.lastUpdate = time;
    this.draw();
    setTimeout(this.update, 0);
  };

  draw = (): void => {
    if (this.canvas.width != window.visualViewport.width) {
      this.canvas.width = window.visualViewport.width;
    }
    if (this.canvas.height != window.visualViewport.height) {
      this.canvas.height = window.visualViewport.height;
    }
    this.renderContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderContext.fillStyle = "lightblue";
    this.renderContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
    Object.keys(this.drawableEntities)
      .reverse()
      .forEach((id) => {
        this.entities[id].draw(this.renderContext);
      });
  };

  run = (): void => {
    setTimeout(this.update, 0);
  };
}
