function random(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// Engine Settings;
const gravity = 0
// code begins

const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const circles = []

for (let i = 0; i < 100; i++) {
  const mass = Math.random() * 20 + 2
  circles.push(
    new Circle(
      random(50, innerWidth - 50),
      Math.random() * 10,
      mass,
      mass / 10,
    ),
  )
}

const ground = new Rectangle(2, canvas.height - 44, 44, canvas.width - 4)
const leftWall = new Rectangle(2, 2, canvas.height - 4, 44)
const rightWall = new Rectangle(
  canvas.width - 44,
  2,
  canvas.height - 4,
  canvas.width - 2,
)
const solid = []
solid.push(ground)
const tick = () => {
  for (let i = 0; i < circles.length; i++) {
    circles[i].tick()
    circles[i].applyForce(new Vector(0, gravity * circles[i].mass))
    circles[i].collision(solid)
    circles[i].collision(circles)
  }
}

const draw = () => {
  brush.clearRect(0, 0, canvas.width, canvas.height)

  circles.forEach((circle) => {
    circle.draw(brush)
  })

  ground.draw(brush)
  leftWall.draw(brush)
  rightWall.draw(brush)
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()
