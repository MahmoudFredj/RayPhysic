class Frequency {
  constructor(period, amplitude) {
    this.amplitude = amplitude
    this.period = period
    this.alteration = 0
    this.points = []
  }

  draw = (brush) => {
    brush.strokeStyle = 'rgba(255, 56, 56,1)'
    brush.beginPath()
    brush.moveTo(this.points[0].x, this.points[0].y)
    for (let point of this.points) {
      brush.lineTo(point.x, point.y)
    }
    brush.stroke()
  }
  tick = () => {
    let angle = 0
    this.period = 0.01
    for (let i = 0; i < innerWidth; i++) {
      this.points[i] = new Vector(
        i,
        innerHeight / 2 + Math.sin((i / innerWidth) * Math.PI) * this.amplitude,
      )
      angle += this.period
    }
  }
}
