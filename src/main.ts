import './style/reset.css'
import './style/main.css'
import { Fish } from './fish'
import { World } from './engine/world'

const run = (): void => {
  document.body.innerHTML = '<canvas id="pond"></canvas>'
  const world = new World()
  world.spawnEntity(new Fish())
}

run()
