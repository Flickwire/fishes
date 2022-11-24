import './style/reset.css'
import './style/main.css'
import { Fish } from './entities/fish'
import { World } from './engine/world'
import { FpsCounter } from './entities/fpsCounter'

const run = (): void => {
  const world = new World()
  world.spawnEntity(new Fish())
  world.spawnEntity(new FpsCounter())
}

run()
