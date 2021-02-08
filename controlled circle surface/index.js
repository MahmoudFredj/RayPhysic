const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const origin = new Vector(innerWidth / 2, innerHeight / 2)
const point = new Vector(0, 0)

let advancing = 1

const tick = () => {}

const draw = () => {
  //   brush.clearRect(0, 0, innerWidth, innerHeight)
  brush.fillStyle = 'rgb(0,0,0,0.1)'
  brush.fillRect(0, 0, innerWidth, innerHeight)

  point.x = Math.sin(Math.random())
  point.y = Math.cos(Math.random())
  point.mult(200)
  point.add(origin)

  brush.strokeStyle = 'rgb(255,255,255,1)'
  brush.beginPath()
  brush.moveTo(point.x, point.y)
  for (
    let i = Math.random() * 0.0001;
    i < Math.PI * 2;
    i += advancing * 4 + 0.0001
  ) {
    point.x = Math.sin(i)
    point.y = Math.cos(i)
    point.mult(200)
    point.add(origin)
    const random = Vector.Random()
    random.mult(50)
    point.add(random)

    brush.lineTo(point.x, point.y)
  }
  point.x = Math.sin(Math.random())
  point.y = Math.cos(Math.random())
  point.mult(200)
  point.add(origin)
  brush.lineTo(point.x, point.y)
  brush.stroke()
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

document.addEventListener('mousemove', (e) => {
  advancing = e.clientX / innerWidth + e.clientY / innerHeight
})

ignite()
