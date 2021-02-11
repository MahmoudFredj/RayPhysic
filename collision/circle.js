class Circle {
  constructor(x, y, radius, mass) {
    this.x = x
    this.y = y
    this.radius = radius
    this.mass = mass
    this.velocity = new Vector(0, 0)
    this.acceleration = new Vector(0, 0)
    this.color = 'rgb(255, 71, 87,0.4)'
    // console.log(this.mass)
    this.maxSpeed = 2
    this.maxAcceleration = 2
  }

  tick = () => {
    //   hardcoding walls
    if (this.x - this.radius <= 50) {
      this.velocity.x *= -1
      this.x = this.radius + 50
    }

    if (this.x + this.radius >= innerWidth - 50) {
      this.velocity.x *= -1
      this.x = innerWidth - 50 - this.radius
    }

    if (this.y - this.radius <= 0) {
      this.velocity.y *= -1
      this.y = this.radius
    }

    // setting velocity
    this.x += this.velocity.x
    this.y += this.velocity.y
    // controlling velocity
    this.velocity.limit(this.maxSpeed)

    // applying acceleration to velocity
    this.velocity.add(this.acceleration)
  }

  applyForce = (force) => {
    // force.div(this.mass)
    this.acceleration.add(force)
    this.acceleration.limit(this.maxAcceleration)
  }
  draw = (brush) => {
    brush.fillStyle = this.color
    brush.strokeStyle = 'rgb(255, 71, 87,1.0)'
    brush.lineWidth = 2
    brush.beginPath()
    brush.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    brush.fill()
    brush.stroke()
    this.color = 'rgb(255, 71, 87,0.4)'
  }

  collision = (list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i] instanceof Circle) {
        if (this.x === list[i].x && this.y === list[i].y) break

        const distance = Vector.distance(
          new Vector(this.x, this.y),
          new Vector(list[i].x, list[i].y),
        )

        if (distance < this.radius + list[i].radius) {
          this.directCollision(list[i])
          this.color = 'rgb(46, 213, 115,0.4)'
        }
      }

      if (list[i] instanceof Rectangle) {
        if (
          this.x + this.radius > list[i].x &&
          this.x < list[i].x + list[i].width &&
          this.y + this.radius > list[i].y &&
          this.y < list[i].y + list[i].height
        ) {
          this.velocity.y *= -1
          this.y = list[i].y - this.radius
        }
      }
    }
  }

  directCollision = (object) => {
    let direction = Vector.sub(
      new Vector(this.x, this.y),
      new Vector(object.x, object.y),
    )
    direction.normalize()
    direction.mult(object.mass)
    this.velocity.add(direction)
    direction.div(object.mass)
    direction.mult(this.mass)
    object.velocity.sub(direction)
  }
}
