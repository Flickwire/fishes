export interface Thought {
    think: (entity: Entity) => void
}

export class Entity {
  name: string
  thoughts: Thought[]

  constructor(name: string) {
    this.name = name
    this.thoughts = []
    this.doThinking()
    console.log(`Spawned entity ${name}`)
  }

  think(): void {
    this.thoughts.forEach(thought => {
      thought.think(this)
    });
  }

  doThinking(): void {
    setInterval(() => {
      this.think()
    }, 0)
  }


}