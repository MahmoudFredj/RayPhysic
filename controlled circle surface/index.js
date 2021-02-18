const canvas = document.querySelector('canvas')
const brush = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let path = []
let spacing = 0.01
let radius = 100
let pos = new Vector(200, 200)
let start = 0
const tick = () => {
  path = []
  for (let i = 0; i < Math.PI * 2; i += spacing) {
    path.push(
      new Vector(Math.sin(i) * radius + pos.x, Math.cos(i) * radius + pos.y),
    )
  }
  let ang = start
  for (let i = 0; i < path.length; i++) {
    path[i].add(new Vector(Math.sin(ang) * 10, Math.cos(ang) * 10))
    ang += 0.1
  }

  start += 0.1
  if (start > 1000) start = 0
}

const draw = () => {
  brush.clearRect(0, 0, innerWidth, innerHeight)
  brush.strokeStyle = 'white'
  brush.fillStyle = 'white'
  brush.beginPath()
  for (let i = 0; i < path.length; i++) {
    brush.lineTo(path[i].x, path[i].y)
  }
  brush.lineTo(path[0].x, path[0].y)
  brush.stroke()
}

const ignite = () => {
  tick()
  draw()
  requestAnimationFrame(ignite)
}

ignite()
