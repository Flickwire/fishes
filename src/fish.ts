export class Fish {
  birthday: number
  age: number

  constructor() {
    this.birthday = window.performance.now()
    this.age = 0
    console.log(`Fish is born at ${this.birthday}`)
    this.doThinking()
  }

  updateAge(): void {
    const time = window.performance.now()
    if (time - this.birthday > 1000) {
      this.age += 1
      this.birthday = time
      console.log(`Fish is ${this.age} seconds old`)
    }
  }

  think(): void {
    this.updateAge()
  }

  async doThinking(): Promise<void> {
    for (;;) {
      this.think()
      await new Promise(r => setTimeout(r, 1));
    }
  }
}