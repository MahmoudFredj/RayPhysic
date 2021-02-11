const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const ball = new Ball(new Vector(innerWidth / 2, 100), 10, 3, 1, 0.9)
const ball2 = new Ball(new Vector(innerWidth / 2, 300), 20, 8, 1, 0.2)

const tick = () => {
  ball.tick()
  ball2.tick()
}
const draw = () => {
  brush.clearRect(0, 0, innerWidth, innerHeight)
  ball.draw(brush)
  ball2.draw(brush)
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()
