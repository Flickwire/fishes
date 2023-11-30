import { Name } from "../components";
import { Component, ComponentUpdateProps, Entity } from "../engine/entity";
import { World } from "../engine/world";
import { Algae } from "./algae";

class SpawnAlgae extends Component {
  lastSpawnTime: number;
  spawnFrequency: number;
  nextSpawnTime: number;

  constructor(entity: Entity, frequency: number) {
    super(entity);
    this.lastSpawnTime = 0;
    this.nextSpawnTime = frequency;
    this.spawnFrequency = frequency;
  }

  update = ({ time }: ComponentUpdateProps): void => {
    if (time >= this.nextSpawnTime) {
      this.entity.world.spawnEntity(Algae.generate(this.entity.world));
      this.nextSpawnTime = time + this.spawnFrequency;
    }
  };
}

export class AlgaeSpawner extends Entity {
  constructor(world: World, frequency: number) {
    super(world);
    this.attachComponent(new Name(this, "Algae Spawner")).attachComponent(
      new SpawnAlgae(this, frequency),
    );
  }
}
