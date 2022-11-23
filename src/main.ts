import './style/reset.css'
import './style/main.css'
import { Fish } from './fish'

const run = (): void => {
  document.body.innerHTML = '<canvas id="pond"></canvas>'
  new Fish()
}

run()
