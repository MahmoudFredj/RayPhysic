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
      new Vector(innerWidth / 2 + i / 60, 100),
      i + 100,
      10,
      1,
      -0.1,
      0.985,
      Math.PI / 2,
    ),
  )
}

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

let windspeed = 0.1
let duration = 50
const domefav = async () => {
  for (let j = 0; j < pang.length; j++) {
    await sleep(3000)
    for (let k = 0; k < duration; k++) {
      await sleep(100)
      for (let i = 0; i < pang.length; i++) {
        pang[i].velocity += windspeed / (pang[i].height / 5)
      }
    }
  }
}
domefav()

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
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()
