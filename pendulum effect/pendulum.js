class Pendulum {
  constructor(pos, height, size, mass, gravity, degredation, startSwing) {
    this.pos = pos
    this.degredation = degredation
    this.height = height
    this.size = size
    this.mass = mass
    this.gravity = gravity
    this.amplitude = startSwing
    this.velocity = 0.0
  }

  draw = (brush) => {
    brush.fillStyle = 'rgb(255,255,255,1)'
    brush.strokeStyle = 'rgb(255, 71, 87,0.1)'

    brush.beginPath()
    brush.moveTo(this.pos.x, this.pos.y)
    brush.lineTo(this.ball.x, this.ball.y)
    brush.stroke()
    brush.beginPath()
    // brush.arc(this.ball.x, this.ball.y, this.size, 0, Math.PI * 2)
    brush.fill()
    brush.stroke()
  }

  tick = () => {
    this.ball = new Vector(Math.sin(this.amplitude), Math.cos(this.amplitude))
    this.ball.mult(this.height)
    this.ball.add(this.pos)

    const acceleration =
      ((this.gravity * this.mass) / this.height) * Math.sin(this.amplitude)

    this.amplitude += this.velocity
    this.velocity += acceleration
    this.velocity *= this.degredation

    // this.amplitude *= this.degredation
  }
}
