class Ball {
  constructor(pos, size, mass, gravity) {
    this.pos = pos
    this.size = size
    this.mass = mass
    this.gravity = gravity
    this.velocity = new Vector(0, 0)
    this.acceleration = 0.1
    this.windAcc = 0.03
  }

  draw = (brush) => {
    brush.fillStyle = 'rgb(255,255,255,0.4)'

    brush.beginPath()
    brush.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2)
    brush.fill()
  }

  tick = () => {
    const ground = innerHeight
    const wall = innerWidth
    this.velocity.y += this.acceleration
    this.velocity.x += this.windAcc

    if (this.pos.y + this.size >= ground) {
      this.pos.y = ground - this.size
      this.velocity.y *= -1
      this.velocity.y /= 1.2
    } else if (this.pos.x + this.size >= wall) {
      this.pos.x = wall - this.size
      this.velocity.x *= -1
    }

    this.pos.y += this.velocity.y * this.gravity * this.mass
    this.pos.x += this.velocity.x / this.mass
  }
}
