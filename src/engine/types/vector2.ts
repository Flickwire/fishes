export class Vector2 {
  x: number
  y: number

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  normalise(): Vector2 {
    const length = this.magnitude()
    return new Vector2(
      this.x / length,
      this.y / length
    )
  }

  magnitude(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y))
  }

  vectorTo(otherPosition: Vector2): Vector2 {
    return new Vector2(
      otherPosition.x - this.x,
      otherPosition.y - this.y
    )
  }
}
