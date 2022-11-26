import './style/reset.css'
import './style/main.css'
import { World } from './engine/world'
import { FpsCounter } from './entities/fpsCounter'
import { FishSpawner } from './entities/fishSpawner'
import { EntityCounter } from './entities/entityCounter'
import { AlgaeSpawner } from './entities/algaeSpawner'

const run = (): void => {
  const world = new World()
  world.spawnEntity(new FishSpawner(world, 400))
  world.spawnEntity(new AlgaeSpawner(world, 100))
  world.spawnEntity(new EntityCounter(world))
  world.spawnEntity(new FpsCounter(world));
  (<any>window).world = world
}

run()
