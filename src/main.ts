import './style/reset.css'
import './style/main.css'
import { World } from './engine/world'
import { FpsCounter } from './entities/fpsCounter'
import { FishSpawner } from './entities/fishSpawner'
import { EntityCounter } from './entities/entityCounter'
import { AlgaeSpawner } from './entities/algaeSpawner'
import { Age, MaxAge } from './components'

const run = (): void => {
  const world = new World()
  const fishSpawner = new FishSpawner(world, 0)
  fishSpawner.attachComponent(new Age(fishSpawner))
    .attachComponent(new MaxAge(fishSpawner, 10))
  world.spawnEntity(fishSpawner)
  world.spawnEntity(new AlgaeSpawner(world, 1000/3))
  world.spawnEntity(new EntityCounter(world))
  world.spawnEntity(new FpsCounter(world));
  (<any>window).world = world
}

run()
