import './style/reset.css'
import './style/main.css'
import { Fish } from './entities/fish'
import { World } from './engine/world'
import { FpsCounter } from './entities/fpsCounter'
import { FishSpawner } from './entities/fishSpawner'

const run = (): void => {
  const world = new World()
  world.spawnEntity(new FishSpawner(world, 50))
  world.spawnEntity(new FpsCounter(world));
  (<any>window).world = world
}

run()
