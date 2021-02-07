const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const pendulum = new Pendulum(
  new Vector(innerWidth / 2, 0),
  300,
  10,
  2,
  -0.01,
  0.994,
  0,
)

const pang = []

for (let i = 0; i < 1000; i++) {
  pang.push(
    new Pendulum(
      new Vector(innerWidth / 2, 0),
      i + 100,
      10,
      20,
      -0.1,
      0.98,
      Math.PI / 2,
    ),
  )
}
const draw = () => {
  brush.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < pang.length; i++) {
    pang[i].draw(brush)
  }
}

const tick = () => {
  for (let i = 0; i < pang.length; i++) {
    pang[i].tick()
  }
}

const ignite = () => {
  //   for (let i = 0; i < 100; i++) {
  // }
  tick()
  draw()
  //   ignite()
  requestAnimationFrame(ignite)
}

ignite()
