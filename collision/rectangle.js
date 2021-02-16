class Rectangle {
  constructor(x, y, height, width) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
  }

  draw = (brush) => {
    brush.fillStyle = 'rgb(46, 213, 115,0.4)'
    brush.strokeStyle = 'rgb(46, 213, 115,1.0)'
    brush.lineWidth = 2
    brush.beginPath()
    brush.moveTo(this.x, this.y)
    brush.lineTo(this.x + this.width, this.y)
    brush.lineTo(this.x + this.width, this.y + this.height)
    brush.lineTo(this.x, this.y + this.height)
    brush.lineTo(this.x, this.y)
    brush.fill()
    brush.stroke()
  }

  tick = () => {}

  collision = (list) => {}
}
