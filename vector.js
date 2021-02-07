class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  normalize() {
    const dist = this.dist()
    this.div(dist)
  }
  static normalize(vector) {
    const dist = vector.dist
    return Vector.div(vector, dist)
  }

  //get distance of the vector
  dist() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  static dist(vector) {
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
  }

  //   OPERATORS
  add(vector) {
    this.x += this.vector.x
    this.y += this.vector.y
  }
  static add(vector1, vector2) {
    return new Vector(vector1.x + vector2.x, vector1.y + vector2.y)
  }

  sub(vector) {
    this.x -= this.vector.x
    this.y -= this.vector.y
  }
  static sub(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y)
  }

  div(scal) {
    this.x /= scal
    this.y /= scal
  }
  static div(vector, scal) {
    return new Vector(vector.x / scal, vector.y / scal)
  }

  mult(scal) {
    this.x *= scal
    this.y *= scal
  }
  static mult(vector, scal) {
    return new Vector(vector.x * scal, vector.y * scal)
  }

  //get normalized random vector
  static Random() {
    return new Vector((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)
  }
}
