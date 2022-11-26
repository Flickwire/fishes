import './style/reset.css'
import './style/main.css'
import { World } from './engine/world'
import { FpsCounter } from './entities/fpsCounter'
import { FishSpawner } from './entities/fishSpawner'
import { EntityCounter } from './entities/entityCounter'

const run = (): void => {
  const world = new World()
  world.spawnEntity(new FishSpawner(world, 50))
  world.spawnEntity(new EntityCounter(world))
  world.spawnEntity(new FpsCounter(world));
  (<any>window).world = world
}

run()
